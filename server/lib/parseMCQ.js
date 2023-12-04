import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const file = join(__dirname, '../data/questions.txt')

function parseMCQs(text) {
    const questions = [];
    const mcqRegex = /(.+?)\n(A\..*?)(\nB\..*?)(\nC\..*?)(\nD\..*?)(\nE\..*?)?; (\w)\n/gs;

    let match;
    while ((match = mcqRegex.exec(text)) !== null) {
        const [_, question, a, b, c, d, e, answer] = match;
        let options = { A: a.trim(), B: b.trim(), C: c.trim(), D: d.trim() };

        // Include option E if it exists
        if (e) {
            options.E = e.trim();
        }

        // Find the explanation for the correct answer if available in the text
        const explanationRegex = new RegExp(answer + "\\. [^;]+?; (.+?)\n", "s");
        const explanationMatch = text.match(explanationRegex);
        const explanation = explanationMatch ? explanationMatch[1].trim() : '';

        questions.push({
            question: question.trim(),
            options,
            answer: answer.trim(),
            // explanation
        });
    }

    return questions;
}

fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }
    const mcqs = parseMCQs(data);
    const json = JSON.stringify(mcqs, null, 2);

    fs.writeFile('output.json', json, 'utf8', (err) => {
        if (err) {
            console.error("Error writing JSON file:", err);
            return;
        }
        console.log('MCQs have been successfully converted to JSON!');
    });
});


export default parseMCQs;