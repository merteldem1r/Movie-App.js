import {
    elements
} from "../base";

export const displayPages = totalPageCount => {
    let html = "";
    for (let k = 1; k <= totalPageCount; k++) {
        let option = `<option value="${k}">${k}</option>`;
        html += option;
    }

    elements.pagesForm.innerHTML = html;
}