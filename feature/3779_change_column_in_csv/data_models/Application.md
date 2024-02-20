# Application

The JSON structure of the model is as follows:

```json
{
    "admin": {
        "application_status": "string",
        "application_type": "string",
        "contact": {
            "email": "string",
            "name": "string"
        },
        "current_journal": "string",
        "date_applied": "2024-02-20T11:44:32Z",
        "editor": "string",
        "editor_group": "string",
        "notes": [
            {
                "author_id": "string",
                "date": "2024-02-20T11:44:32Z",
                "id": "string",
                "note": "string"
            }
        ],
        "owner": "string",
        "related_journal": "string",
        "seal": true
    },
    "bibjson": {
        "alternative_title": "string",
        "apc": {
            "has_apc": true,
            "max": [
                {
                    "currency": "string",
                    "price": 0
                }
            ],
            "url": "string"
        },
        "article": {
            "i4oc_open_citations": true,
            "license_display": [
                "string"
            ],
            "license_display_example_url": "string",
            "orcid": true
        },
        "boai": true,
        "copyright": {
            "author_retains": true,
            "url": "string"
        },
        "deposit_policy": {
            "has_policy": true,
            "is_registered": true,
            "service": [
                "string"
            ],
            "url": "string"
        },
        "discontinued_date": "2024-02-20",
        "editorial": {
            "board_url": "string",
            "review_process": [
                "string"
            ],
            "review_url": "string"
        },
        "eissn": "string",
        "institution": {
            "country": "string",
            "name": "string"
        },
        "is_replaced_by": [
            "string"
        ],
        "keywords": [
            "string"
        ],
        "language": [
            "string"
        ],
        "license": [
            {
                "BY": true,
                "NC": true,
                "ND": true,
                "SA": true,
                "type": "string",
                "url": "string"
            }
        ],
        "oa_start": 0,
        "other_charges": {
            "has_other_charges": true,
            "url": "string"
        },
        "pid_scheme": {
            "has_pid_scheme": true,
            "scheme": [
                "string"
            ]
        },
        "pissn": "string",
        "plagiarism": {
            "detection": true,
            "url": "string"
        },
        "preservation": {
            "has_preservation": true,
            "national_library": [
                "string"
            ],
            "service": [
                "string"
            ],
            "url": "string"
        },
        "publication_time_weeks": 0,
        "publisher": {
            "country": "string",
            "name": "string"
        },
        "ref": {
            "aims_scope": "string",
            "author_instructions": "string",
            "journal": "string",
            "license_terms": "string",
            "oa_statement": "string"
        },
        "replaces": [
            "string"
        ],
        "subject": [
            {
                "code": "string",
                "scheme": "string",
                "term": "string"
            }
        ],
        "title": "string",
        "waiver": {
            "has_waiver": true,
            "url": "string"
        }
    },
    "created_date": "2024-02-20T11:44:32Z",
    "es_type": "string",
    "id": "string",
    "index": {
        "application_type": "string",
        "asciiunpunctitle": "string",
        "classification": [
            "string"
        ],
        "classification_paths": [
            "string"
        ],
        "continued": "string",
        "country": "string",
        "has_apc": "string",
        "has_editor": "string",
        "has_editor_group": "string",
        "has_seal": "string",
        "issn": [
            "string"
        ],
        "language": [
            "string"
        ],
        "license": [
            "string"
        ],
        "schema_code": [
            "string"
        ],
        "schema_codes_tree": [
            "string"
        ],
        "schema_subject": [
            "string"
        ],
        "subject": [
            "string"
        ],
        "title": [
            "string"
        ],
        "unpunctitle": "string"
    },
    "last_manual_update": "2024-02-20T11:44:32Z",
    "last_updated": "2024-02-20T11:44:32Z"
}
```

Each of the fields is defined as laid out in the table below.  All fields are optional unless otherwise specified:

| Field | Description | Datatype | Format | Allowed Values |
| ----- | ----------- | -------- | ------ | -------------- |
| admin.application_status |  | str |  |  |
| admin.application_type |  | str |  | new_application, update_request |
| admin.contact.email |  | str |  |  |
| admin.contact.name |  | str |  |  |
| admin.current_journal |  | str |  |  |
| admin.date_applied |  | str | UTC ISO formatted date: YYYY-MM-DDTHH:MM:SSZ |  |
| admin.editor | the currently assigned DOAJ editor for this journal | str |  |  |
| admin.editor_group |  | str |  |  |
| admin.notes.author_id |  | str |  |  |
| admin.notes.date |  | str | UTC ISO formatted date: YYYY-MM-DDTHH:MM:SSZ |  |
| admin.notes.id |  | str |  |  |
| admin.notes.note |  | str |  |  |
| admin.owner |  | str |  |  |
| admin.related_journal |  | str |  |  |
| admin.seal |  | bool |  |  |
| bibjson.alternative_title | Alternative title (including translation of the title) | str |  |  |
| bibjson.apc.has_apc | Does the journal charge fees for publishing an article (APCs)? | bool |  |  |
| bibjson.apc.max.currency |  | str |  |  |
| bibjson.apc.max.price |  | int |  |  |
| bibjson.apc.url | Where can we find this information? | str | URL |  |
| bibjson.article.i4oc_open_citations | Does the journal comply with I4OC standards for open citations? | bool |  |  |
| bibjson.article.license_display | Does the journal embed and/or display licensing information in its articles? | str |  | Embed, Display, No |
| bibjson.article.license_display_example_url | Recent article displaying or embedding a license in the full text | str | URL |  |
| bibjson.article.orcid | Does the journal allow for ORCID iDs to be present in article metadata? | bool |  |  |
| bibjson.boai | Does the journal adhere to DOAJ’s definition of open access? | bool |  |  |
| bibjson.copyright.author_retains | For all the licenses you have indicated above, do authors retain the copyright <b>and</b> full publishing rights without restrictions? | bool |  |  |
| bibjson.copyright.url | Where can we find this information? | str | URL |  |
| bibjson.deposit_policy.has_policy |  | bool |  |  |
| bibjson.deposit_policy.is_registered |  | bool |  |  |
| bibjson.deposit_policy.service | Name of other website where policy is registered | str |  |  |
| bibjson.deposit_policy.url | Where can we find this information? | str | URL |  |
| bibjson.discontinued_date |  | str | Date, year first: YYYY-MM-DD |  |
| bibjson.editorial.board_url | Link to the journal’s <b>Editorial Board</b> | str | URL |  |
| bibjson.editorial.review_process | Other peer review | str |  |  |
| bibjson.editorial.review_url | Where can we find this information? | str | URL |  |
| bibjson.eissn | ISSN (online) | str |  |  |
| bibjson.institution.country |  | str |  |  |
| bibjson.institution.name |  | str |  |  |
| bibjson.is_replaced_by |  | str |  |  |
| bibjson.keywords | Up to 6 subject keywords in English | str |  |  |
| bibjson.language | Languages in which the journal accepts manuscripts | str |  |  |
| bibjson.license.BY | Select all the attributes that your license has | bool |  |  |
| bibjson.license.NC | Select all the attributes that your license has | bool |  |  |
| bibjson.license.ND | Select all the attributes that your license has | bool |  |  |
| bibjson.license.SA | Select all the attributes that your license has | bool |  |  |
| bibjson.license.type | License(s) permitted by the journal | str |  |  |
| bibjson.license.url | Where can we find this information? | str | URL |  |
| bibjson.oa_start | When did the journal start to publish all content using an open license? | int |  |  |
| bibjson.other_charges.has_other_charges | Does the journal charge any other fees to authors? | bool |  |  |
| bibjson.other_charges.url |  | str | URL |  |
| bibjson.pid_scheme.has_pid_scheme |  | bool |  |  |
| bibjson.pid_scheme.scheme | Other identifier | str |  |  |
| bibjson.pissn | ISSN (print) | str |  |  |
| bibjson.plagiarism.detection | Does the journal routinely screen article submissions for plagiarism? | bool |  |  |
| bibjson.plagiarism.url | Where can we find this information? | str | URL |  |
| bibjson.preservation.has_preservation |  | bool |  |  |
| bibjson.preservation.national_library | A national library | str |  |  |
| bibjson.preservation.service | Other archiving policy: | str |  |  |
| bibjson.preservation.url | Where can we find this information? | str | URL |  |
| bibjson.publication_time_weeks | Average number of <strong>weeks</strong> between article submission & publication | int |  |  |
| bibjson.publisher.country |  | str |  |  |
| bibjson.publisher.name |  | str |  |  |
| bibjson.ref.aims_scope | Link to the journal’s <b>Aims & Scope</b> | str | URL |  |
| bibjson.ref.author_instructions | Link to the journal’s <b>Instructions for Authors</b> | str | URL |  |
| bibjson.ref.journal | Link to the journal’s homepage | str | URL |  |
| bibjson.ref.license_terms |  | str | URL |  |
| bibjson.ref.oa_statement | The journal website must display its open access statement. Where can we find this information? | str | URL |  |
| bibjson.replaces |  | str |  |  |
| bibjson.subject.code |  | str |  |  |
| bibjson.subject.scheme |  | str |  |  |
| bibjson.subject.term |  | str |  |  |
| bibjson.title | Journal title | str |  |  |
| bibjson.waiver.has_waiver | Does the journal provide a waiver or discount on publication fees for authors? | bool |  |  |
| bibjson.waiver.url | Where can we find this information? | str | URL |  |
| created_date |  | str | UTC ISO formatted date: YYYY-MM-DDTHH:MM:SSZ |  |
| es_type |  | str |  |  |
| id |  | str |  |  |
| index.application_type |  | str |  |  |
| index.asciiunpunctitle |  | str |  |  |
| index.classification |  | str |  |  |
| index.classification_paths |  | str |  |  |
| index.continued |  | str |  |  |
| index.country |  | str |  |  |
| index.has_apc |  | str |  |  |
| index.has_editor |  | str |  |  |
| index.has_editor_group |  | str |  |  |
| index.has_seal |  | str |  |  |
| index.issn |  | str |  |  |
| index.language |  | str |  |  |
| index.license |  | str |  |  |
| index.schema_code |  | str |  |  |
| index.schema_codes_tree |  | str |  |  |
| index.schema_subject |  | str |  |  |
| index.subject |  | str |  |  |
| index.title |  | str |  |  |
| index.unpunctitle |  | str |  |  |
| last_manual_update |  | str | UTC ISO formatted date: YYYY-MM-DDTHH:MM:SSZ |  |
| last_updated |  | str | UTC ISO formatted date: YYYY-MM-DDTHH:MM:SSZ |  |
