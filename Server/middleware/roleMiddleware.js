const roleMiddleware = (allowedRoles) => {

    return (req, res, next) => {

        if (!allowedRoles.includes(req.user.role)) {
            return res.send({
                status: 0,
                msg: "Access denied"
            });
        }

        next();
    };
};

module.exports = roleMiddleware;