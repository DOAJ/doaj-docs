let testbook = {};

testbook.state = {
    currentTestSet: false,
    structure: [],
    scrollOffset: 0
}

testbook.init = function(structure) {
    testbook.state.structure = structure;
    testbook.state.scrollOffset = $(".control").height() + 30;
    $.ajaxSetup({cache: false});

    $(".toggle_nav").on("click.ToggleNav", testbook.toggleNav);
    $(".navlink").on("click.NavLink", testbook.navClick);
    $(".add-remove").on("click.AddRemove", testbook.toggleAddRemove);
    $(".add-remove-all").on("click.AddRemoveAll", testbook.toggleAddRemoveAll);
    $(".clear-selected").on("click.ClearSelected", testbook.clearSelected);
    $(".download-selection").on("click.DownloadSelection", testbook.downloadSelection);

    let selected = window.localStorage.getItem("selected")
    if (!selected) {
        window.localStorage.setItem("selected", JSON.stringify([]));
    }

    testbook.updateSelectedCount();
    testbook.updateSelectedHighlights();
    testbook.updateAddRemoveButtons();

    let hash = window.location.hash
    if (hash) {
        hash = hash.substring(1);
        testbook.loadTarget(hash);
    }
}

testbook.toggleNav = function(event) {
    event.preventDefault();

    let el = $(event.target);
    let sublist = el.parent().find("> ul");
    sublist.slideToggle();
}

testbook.navClick = function(event) {
    event.preventDefault();

    let el = $(event.target);
    let target = el.attr("data-target");
    testbook.loadTarget(target);
}

testbook._testSetId = function(suite, set) {
    return suite + "__" + set
}

testbook.loadTarget = function(target) {
    let bits = target.split("/");

    let suite = false;
    let set = false;
    let test = false;

    if (bits.length === 2) {
        suite = bits[0]
        set = bits[1]
    } else if (bits.length === 3) {
        suite = bits[0]
        set = bits[1]
        test = bits[2]
    } else {
        alert("unable to identify testset to load")
    }

    let targetId = testbook._testSetId(suite, set);
    if (targetId === testbook.state.currentTestSet) {
        let top = document.getElementById(test).offsetTop;
        window.scrollTo(0, top - testbook.state.scrollOffset);
        history.pushState(null, null, "#" + target);
        return;
    }

    testbook.loadTestSet({
        target: target,
        suite: suite,
        set: set,
        test: test
    })
}

testbook.loadTestSet = function(params) {
    let id = testbook._testSetId(params.suite, params.set);
    $.get({
        url: id + ".html",
        success: testbook.receivedTestSetHTML(id, params),
        error: testbook.errorTestSetHTML
    })
}

testbook.receivedTestSetHTML = function(id, params) {
    let tid = params.target.replaceAll("/", "__");
    return function(data) {
        $("#tests").html(data)
        testbook.state.currentTestSet = id;

        if (params.test) {
            let top = document.getElementById(params.test).offsetTop;
            window.scrollTo(0, top - testbook.state.scrollOffset);
        } else {
            window.scrollTo(0, 0);
        }

        history.pushState(null, null, "#" + params.target);

        $(".navlink").off("click.NavLink").on("click.NavLink", testbook.navClick);
        $(".add-remove").off("click.AddRemove").on("click.AddRemove", testbook.toggleAddRemove);
        $(".add-remove-all").off("click.AddRemoveAll").on("click.AddRemoveAll", testbook.toggleAddRemoveAll);
        $(".naventry").removeClass("navselected");
        $("#nav_" + params.suite).addClass("navselected");
        $("#nav_" + id).addClass("navselected");

        testbook.updateAddRemoveButtons();
        testbook.setNavigationState();
    }
}

testbook.errorTestSetHTML = function(data) {
    alert("error retrieving test set")
}

testbook.toggleAddRemove = function(event) {
    let el = $(event.target);
    let target = el.attr("data-target");
    let action = el.attr("data-action");

    if (action === "add") {
        testbook.addSelection(target);
        el.attr("data-action", "remove");
        let removeText = el.attr("data-remove")
        el.html(removeText);
    } else if (action === "remove") {
        testbook.removeSelection(target);
        el.attr("data-action", "add");
        let addText = el.attr("data-add")
        el.html(addText);
    }

    testbook.updateSelectedCount();
    testbook.updateSelectedHighlights();
}

testbook.toggleAddRemoveAll = function(event) {
    let el = $(event.target);
    let target = el.attr("data-target");
    let action = el.attr("data-action");

    let bits = target.split("/");
    let suite = false;
    for (let i = 0; i < testbook.state.structure.length; i++) {
        if (testbook.state.structure[i].suite_id === bits[0]) {
            suite = testbook.state.structure[i];
            break
        }
    }

    if (action === "add") {
        if (!suite) {
            alert("Test suite to add not found");
            return;
        }

        if (bits.length === 1) {
            for (let i = 0; i < suite.testsets.length; i++) {
                let testset = suite.testsets[i];
                for (let i = 0; i < testset.tests.length; i++) {
                    testbook.addSelection(testset.tests[i].test_path);
                }
            }
        } else if (bits.length === 2) {
            // adding a testset
            let testset = false;
            for (let i = 0; i < suite.testsets.length; i++) {
                if (suite.testsets[i].testset_id === bits[1]) {
                    testset = suite.testsets[i]
                }
            }
            if (!testset) {
                alert("Testset to add not found");
                return;
            }

            for (let i = 0; i < testset.tests.length; i++) {
                testbook.addSelection(testset.tests[i].test_path);
            }
        }

        el.attr("data-action", "remove");
        let removeText = el.attr("data-remove")
        el.html(removeText);

    } else if (action === "remove") {
        if (!suite) {
            alert("Test suite to remove not found");
            return;
        }

        if (bits.length === 1) {
            for (let i = 0; i < suite.testsets.length; i++) {
                let testset = suite.testsets[i];
                for (let i = 0; i < testset.tests.length; i++) {
                    testbook.removeSelection(testset.tests[i].test_path);
                }
            }
        } else if (bits.length === 2) {
            // adding a testset
            let testset = false;
            for (let i = 0; i < suite.testsets.length; i++) {
                if (suite.testsets[i].testset_id === bits[1]) {
                    testset = suite.testsets[i]
                }
            }
            if (!testset) {
                alert("Testset to remove not found");
                return;
            }

            for (let i = 0; i < testset.tests.length; i++) {
                testbook.removeSelection(testset.tests[i].test_path);
            }
        }

        el.attr("data-action", "add");
        let addText = el.attr("data-add")
        el.html(addText);
    }

    testbook.updateSelectedCount();
    testbook.updateSelectedHighlights();
    testbook.updateAddRemoveButtons();
}

testbook.updateSelectedCount = function() {
    let current = window.localStorage.getItem("selected");
    let data = JSON.parse(current);
    $(".selected-count").html(data.length);
}

testbook.updateSelectedHighlights = function() {
    let current = window.localStorage.getItem("selected");
    let data = JSON.parse(current);
    $(".naventry").removeClass("testselected");
    for (let i = 0; i < data.length; i++) {
        let entry = data[i];
        let id = entry.replaceAll("/", "__")
        $("#nav_" + id).addClass("testselected");
    }
}

testbook.updateAddRemoveButtons = function() {
    let current = window.localStorage.getItem("selected");
    let data = JSON.parse(current);
    $(".add-remove").each(function(idx) {
        let el = $(this);
        let target = el.attr("data-target");
        if (data.includes(target)) {
            let removeText = el.attr("data-remove");
            el.attr("data-action", "remove");
            el.html(removeText);
        } else {
            let addText = el.attr("data-add");
            el.attr("data-action", "add");
            el.html(addText);
        }
    })
}

testbook.setNavigationState = function() {
    let bits = testbook.state.currentTestSet.split("__");
    let suiteNav = "#nav_" + bits[0];
    let sublist = $(suiteNav).siblings("ul");
    sublist.show()

    let testsetNav = "#nav_" + testbook.state.currentTestSet;
    sublist = $(testsetNav).siblings("ul");
    sublist.show();
}

testbook.addSelection = function(target) {
    let current = window.localStorage.getItem("selected")
    let data = JSON.parse(current)
    if (!data.includes(target)) {
        data.push(target);
    }
    window.localStorage.setItem("selected", JSON.stringify(data))
}

testbook.removeSelection = function(target) {
    let current = window.localStorage.getItem("selected")
    let data = JSON.parse(current)
    let idx = data.indexOf(target);
    if (idx > -1) {
        data.splice(idx, 1);
    }
    window.localStorage.setItem("selected", JSON.stringify(data))
}

testbook.clearSelected = function(event) {
    event.preventDefault();

    let sure = confirm("Are you sure you want to clear your selection?");
    if (!sure) {
        return;
    }

    window.localStorage.setItem("selected", JSON.stringify([]));
    testbook.updateSelectedCount();
    testbook.updateSelectedHighlights();
}

testbook.downloadSelection = function(event) {
    event.preventDefault();

    let current = window.localStorage.getItem("selected")
    let data = JSON.parse(current)
    if (data.length === 0) {
        return;
    }

    // sort the data into the desired order, and at the same time
    // pull out the headers in the position in the order that they
    // will be required
    let ordered = [];
    let headers = [];
    let header_registry = []
    outside:
    for (let suite of testbook.state.structure) {
        for (let testset of suite.testsets) {
            for (let test of testset.tests) {
                let idx = data.indexOf(test.test_path)
                if (idx > -1) {
                    if (!header_registry.includes(testset.testset_path)) {
                        header_registry.push(testset.testset_path)
                        headers.push([ordered.length, testset.testset_path]);
                    }
                    ordered.push(["test", test.test_path])
                    data.splice(idx, 1);
                    if (data.length === 0) {
                        break outside;
                    }
                }
            }
        }
    }

    // now mesh the headers and the tests together
    for (let i = headers.length - 1; i >= 0; i--) {
        let header = headers[i];
        ordered.splice(header[0], 0, ["testset", header[1]])
    }

    let promises = [];
    for (let i = 0; i < ordered.length; i++) {
        let instruction = ordered[i];
        let entry = instruction[1];
        let id = entry.replaceAll("/", "__");
        promises.push(new Promise((resolve, reject) => {
            let urlBase = instruction[0] === "test" ? "test_csvs/" : "headers/";
            $.get({
                url: urlBase + id + ".csv",
                success: resolve,
                error: reject
            })
        }))
    }

    Promise.all(promises).then((values) => {
        let preamble = "data:text/csv;charset=utf-8,"
        preamble += "Step Number,User/User Role,Action,Expected Test Results,Testers feedback on script"
        let csv = values.join("\n");
        let encodedUri = preamble + encodeURIComponent("\n" + csv);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);

        let date = new Date();
        let fileSuffix = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate() + "_" + date.getUTCHours() + date.getUTCSeconds();
        link.setAttribute("download", "testbook-" + fileSuffix + ".csv");
        document.body.appendChild(link);
        link.click();
    })
}