function isValidJSON(json) {
    try {
        return JSON.parse(json);
    } catch {
        return null;
    }
}

function compareJson(oldObj, newObj) {
    const result = {};

    const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

    for (const key of allKeys) {
        const oldVal = oldObj[key];
        const newVal = newObj[key];

        if (!(key in oldObj)) {
            result[key] = { type: 'new', newValue: newVal };
        } else if (!(key in newObj)) {
            result[key] = { type: 'deleted', oldValue: oldVal };
        } else if (JSON.stringify(oldVal) === JSON.stringify(newVal)) {
            result[key] = {
                type: 'unchanged',
                oldValue: oldVal,
                newValue: newVal
            };
        } else {
            result[key] = {
                type: 'changed',
                oldValue: oldVal,
                newValue: newVal
            };
        }
    }

    return result;
}

export function setupComparePage() {
    const oldJsonInput = document.getElementById('oldJson');
    const newJsonInput = document.getElementById('newJson');
    const compareBtn = document.getElementById('compareButton');
    const resultOutput = document.getElementById('resultOutput');
    const compareError = document.getElementById('compareError');

    compareBtn.addEventListener('click', () => {
        compareError.textContent = '';
        resultOutput.textContent = '';

        const oldParsed = isValidJSON(oldJsonInput.value);
        const newParsed = isValidJSON(newJsonInput.value);

        if (!oldParsed || !newParsed) {
            compareError.textContent = 'Please enter valid JSON in both fields';
            return;
        }

        const result = compareJson(oldParsed, newParsed);
        resultOutput.textContent = JSON.stringify(result, null, 2);
    });
}
