function logger(req, res, next) {
    console.log(`[Logger] Timestamp  : ${new Date().toISOString()}`);
    console.log(`[Logger] Method     : ${req.method}`);
    console.log(`[Logger] Path       : ${req.path}`);
    console.log(`[Logger] Query      :`, req.query);
 
    next();
}
 
export default logger;