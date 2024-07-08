#!/bin/bash

################################################################################
# Script Name: docs-cleanup.sh
# Description: This script automates the cleanup of outdated feature branches
#              based on closed GitHub issues in the repository.
#
# Prerequisites:
# - GitHub CLI (`gh`) and `jq` must be installed (e.g., `apt-get install gh jq`).
# - Ensure script is executable (`chmod +x docs-cleanup.sh`).
# - Authenticate with GitHub using `gh auth login`.
#
# Usage: ./docs-cleanup.sh
# Note: Logs are stored in YYYY-MM-branch-cleanup.log.
#
# Author: Aga
# Date: 8-7-2024
# Version: 1.0
################################################################################

# Variables
REPO="DOAJ/doajPM" # correct format for the repository where issues belong
FEATURE_DIR="./feature"
REMOVED_FOLDERS=()
UNPROCESSED_FOLDERS=()
NOT_FOUND_ISSUES=()
LOG_FILE="$(date +'%Y-%m')-branch-cleanup.log"
CURRENT_MONTH=$(date +'%m') # Get current month in MM format

# Function to check issue status
check_issue_status() {
    local issue_number=$1
    issue_status=$(gh issue view $issue_number --repo $REPO --json state -q .state 2>&1)
    
    if [[ $issue_status == *"Could not resolve to an issue or pull request with the number"* ]]; then
        echo "NOT_FOUND"
    else
        echo $issue_status
    fi
}

# Function to log messages
log_message() {
    local message=$1
    echo "$(date +'%Y-%m-%d %H:%M:%S') - $message" >> "$LOG_FILE"
}

# Function to construct the commit message
construct_commit_message() {
    local month="$1"
    local removed_issues="$2"
    echo "${month} Docs Clean up; Removed issues' docs: ${removed_issues}"
}

# Processing folders in the /feature directory
for folder in "$FEATURE_DIR"/*/ ; do
    folder=${folder%/} # Remove trailing slash
    folder_name=$(basename "$folder")

    if [[ $folder_name =~ ^([0-9]{4})_.*$ ]]; then
        issue_number=${BASH_REMATCH[1]}
        issue_status=$(check_issue_status $issue_number)

        if [[ $issue_status == "CLOSED" ]]; then
            REMOVED_FOLDERS+=("$folder_name")
            log_message "Removed folder: $folder_name"
            echo "Removing folder: $folder_name"
            rm -rf "$folder" # Remove the folder and its contents
        elif [[ $issue_status == "NOT_FOUND" ]]; then
            NOT_FOUND_ISSUES+=("$folder_name")
            log_message "Issue $issue_number not found in $REPO. Skipping folder: $folder_name"
            echo "Issue $issue_number not found in $REPO. Skipping folder: $folder_name"
        else
            UNPROCESSED_FOLDERS+=("$folder_name")
            log_message "Issue $issue_number is not closed. Skipping folder: $folder_name"
            echo "Issue $issue_number is not closed. Skipping folder: $folder_name"
        fi
    else
        UNPROCESSED_FOLDERS+=("$folder_name")
        log_message "Folder name does not match pattern: $folder_name"
        echo "Folder name does not match pattern: $folder_name"
    fi
done

# Construct list of removed issues for commit message
removed_issues_list=""
for issue in "${REMOVED_FOLDERS[@]}"; do
    issue_number=$(echo "$issue" | cut -d'_' -f1) # Extract issue number from folder name
    removed_issues_list+=" ${issue_number}"
done

# Construct commit message
commit_message=$(construct_commit_message "${CURRENT_MONTH}" "${removed_issues_list}")
echo "Committing changes with message: '${commit_message}'"

# Commit changes
git commit -am "${commit_message}"
git push origin script

# Output results
echo "Removed folders: ${REMOVED_FOLDERS[@]}"
echo "Unprocessed folders: ${UNPROCESSED_FOLDERS[@]}"
echo "Folders with not found issues: ${NOT_FOUND_ISSUES[@]}"
echo "All folders processed"

# Final log message
log_message "Script execution completed."

