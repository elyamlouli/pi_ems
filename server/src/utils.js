exports.get_token = function(req) {
    const authHeader = req.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    return token;
};