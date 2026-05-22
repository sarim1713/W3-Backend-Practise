import express from 'express';
import course from './course.js';

import logger from './logger.js';
import validateQuery from './validateQuery.js';        
 
const app = express();
const PORT = 3000;

app.use(logger);

app.get(
    '/departments/:dept/courses',
    validateQuery,
        // Q2: validate credits before hitting the handler
    (req, res) => {
        const { dept } = req.params;
        const { level, minCredits, maxCredits, semester, instructor } = req.query;
 
        // Credits are guaranteed valid integers by validateQuery — safe to parse
        const min = minCredits !== undefined ? parseInt(minCredits, 10) : null;
        const max = maxCredits !== undefined ? parseInt(maxCredits, 10) : null;
 
        const results = courses.filter((course) => {
            if (course.department.toLowerCase() !== dept.toLowerCase()) return false;
            if (level      && course.level.toLowerCase()      !== level.toLowerCase())      return false;
            if (min !== null && course.credits < min)                                        return false;
            if (max !== null && course.credits > max)                                        return false;
            if (semester   && course.semester.toLowerCase()   !== semester.toLowerCase())   return false;
            if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) return false;
            return true;
        });
 
        return res.json({
            results,
            meta: { total: results.length },
        });
    }
);
