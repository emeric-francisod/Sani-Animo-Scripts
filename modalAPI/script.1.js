const FOCUS_ELT = ["a", "area", "audio", "button", "embed", "form", "iframe", "img", "input", "keygen", "label", "object", "select", "svg", "textarea", "video"];
const FOCUS_ATTR = ["contenteditable", "focusable", "tabindex"];

function getTabElements(parentElt) {
    let query = "";
    let tabableElements = [];

    for (let i = 0 ; i < FOCUS_ELT.length ; i++) {
        query += FOCUS_ELT[i] + ", ";
    }
    for (let i = 0 ; i < FOCUS_ATTR.length ; i++) {
        query += "[" + FOCUS_ATTR[i] + "]";
        if (i < FOCUS_ATTR.length - 1) {
            query += ", ";
        }
    }

    let tabElts = parentElt.querySelectorAll(query);
    for (let i = 0 ; i < tabElts.length ; i++) {
        let elementTabIndex = tabElts[i].getAttribute("tabindex");
        if (elementTabIndex !== "-1") {
            tabableElements.push([tabElts[i], elementTabIndex]);
        }
    }

    return tabableElements;
}

function giveTabNavigation(eltsArray) {
    for (let i = 0 ; i < eltsArray.length ; i++) {
        if (eltsArray[i][1] === null) {
            eltsArray[i][0].removeAttribute("tabindex");
        } else {
            eltsArray[i][0].setAttribute("tabindex", eltsArray[i][1]);
        }
    }
}

function removeTabNavigation(eltsArray) {
    for (let i = 0 ; i < eltsArray.length ; i++) {
        eltsArray[i][0].setAttribute("tabindex", "-1");
    }
}
