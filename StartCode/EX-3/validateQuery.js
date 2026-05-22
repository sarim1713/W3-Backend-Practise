function validateQuery(req, res, next) {
    const { minCredits, maxCredits } = req.query;
 
    const isValidInt = (value) => /^\d+$/.test(value);
 
    //validate minCredits
    if (minCredits !== undefined && !isValidInt(minCredits)) {
        return res.status(400).json({
            error: 'Bad Request: minCredits must be a valid integer.',
        });
    }
 
    //validate maxCredits
    if (maxCredits !== undefined && !isValidInt(maxCredits)) {
        return res.status(400).json({
            error: 'Bad Request: maxCredits must be a valid integer.',
        });
    }
 
    // logical range check (only when both are present)
    if (minCredits !== undefined && maxCredits !== undefined) {
        const min = parseInt(minCredits, 10);
        const max = parseInt(maxCredits, 10);
 
        if (min > max) {
            return res.status(400).json({
                error: `Bad Request: minCredits (${min}) cannot be greater than maxCredits (${max}).`,
            });
        }
    }
 
    next(); // validation passed
}
 
export default validateQuery;