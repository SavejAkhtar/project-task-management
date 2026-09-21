const roleMiddleware = require("../middleware/roleMiddleware");

test("should allow user with correct role", () => {

    let req = {
        user: {
            role: "projectManager"
        }
    };

    let res = {
        send: jest.fn()
    };

    let next = jest.fn();

    roleMiddleware(["projectManager"])(req, res, next);

    expect(next).toHaveBeenCalled();
});

test("should deny user with wrong role", () => {

    let req = {
        user: {
            role: "teamMember"
        }
    };

    let res = {
        send: jest.fn()
    };

    let next = jest.fn();

    roleMiddleware(["projectManager"])(req, res, next);

    expect(res.send).toHaveBeenCalled();
});