process.env.NODE_ENV = "testing";
process.env.API_BASE = "/api";

import User from "../users/users-model";
const request = require('supertest');

const defaultUser = { "username": "test-user@test.com", "password": "test123"};
const createUser = async () => {
    const UserModel = new User(defaultUser);
    await UserModel.save();
};

const getDefaultUser = async () => {
    let users = await User.find({ "username": defaultUser.username});
    if (users.length === 0) {
        await createUser();
        return getDefaultUser();
    } else {
        return users[0];
    }
};

export const loginWithDefaultUser = async () => {
    let user = await getDefaultUser();
    return request.post(process.env.API_BASE + "/auth/register")
        .send({"username": defaultUser.username, "password": defaultUser.password})
        .expect(200);
};

export const cleanExceptdefaultUser = async () => {
    let user = await getDefaultUser();
}