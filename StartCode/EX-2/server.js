import express from 'express';
import courses from './course.js';

const app = express();
const PORT = 3000;

app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    // Q4 – Edge case: invalid credit range
    if (minCredits !== undefined && maxCredits !== undefined) {
        const min = parseInt(minCredits);
        const max = parseInt(maxCredits);
        if (!isNaN(min) && !isNaN(max) && min > max) {
            return res.status(400).json({
                error: 'Invalid credit range: minCredits cannot be greater than maxCredits.'
            });
        }
    }

    // Q3 – Filter by dept from route param, then apply query param filters
    let results = courses.filter(course => {
        // Match department 
        if (course.department.toLowerCase() !== dept.toLowerCase()) return false;

        //level
        if (level && course.level !== level) return false;

        //minCredits
        if (minCredits !== undefined) {
            const min = parseInt(minCredits);
            if (!isNaN(min) && course.credits < min) return false;
        }

        //maxCredits
        if (maxCredits !== undefined) {
            const max = parseInt(maxCredits);
            if (!isNaN(max) && course.credits > max) return false;
        }

        //semester
        if (semester && course.semester !== semester) return false;

        //instructor
        if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) return false;

        return true;
    });

    // Q4 – Edge case: no matching courses
    if (results.length === 0) {
        return res.status(404).json({
            results: [],
            meta: { total: 0 },
            message: `No courses found for department "${dept}" with the given filters.`
        });
    }

    res.json({
        results,
        meta: { total: results.length }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
