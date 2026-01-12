`use strict`;

// Year
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

// Header Search
const form = document.getElementById("header-search-form");
const input = document.getElementById("header-search");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearHighlights();

    const query = input.value.trim();
    if (!query) {
        return;
    }

    const queryLower = query.toLowerCase();
    const match = findTextNodeWithQuery(document.body, queryLower);
    if (match) {
        const index = match.nodeValue.toLowerCase().indexOf(queryLower);
        highlightAndScroll(match, index, query.length);
    }
});

function findTextNodeWithQuery(element, queryLower) {
    //Pre-order traversal of the DOM tree
    for (let node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.nodeValue.toLowerCase().includes(queryLower)) {
                return node;
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const childMatch = findTextNodeWithQuery(node, queryLower);
            if (childMatch) return childMatch;
        }
    }
    return null;
}

function highlightAndScroll(textNode, index, length) {
    // Split the text node into: before + match + after
    const text = textNode.nodeValue;
    const before = text.slice(0, index);
    const match = text.slice(index, index + length);
    const after = text.slice(index + length);

    const mark = document.createElement("mark");
    mark.className = "search-highlight";
    mark.textContent = match;

    const matchedText = document.createDocumentFragment();
    if (before) {
        matchedText.appendChild(document.createTextNode(before));
    }
    matchedText.appendChild(mark);
    if (after) {
        matchedText.appendChild(document.createTextNode(after));
    }

    textNode.parentNode.replaceChild(matchedText, textNode);

    mark.scrollIntoView({
        behavior: "smooth",
        block: "center",
    });
}

function clearHighlights() {
    document.querySelectorAll("mark.search-highlight").forEach((mark) => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        // restore the DOM tree to a valid state
        parent.normalize();
    });
}
