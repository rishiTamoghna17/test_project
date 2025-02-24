const Member = require("../models/member/member.models.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { ApiError } = require("../utils/ApiError.js");

exports.addMember = asyncHandler(async (req, res) => {
    const { name, phone, gender, age, blood_group, type } = req.body;

    const newMember = await Member.create({
        name,
        phone,
        gender,
        age,
        blood_group,
        type
    });

    if (!newMember) {
        throw new ApiError(500, "Something went wrong while adding the member");
    }

    return res.status(201).json(new ApiResponse(201, { member: newMember }, "Member added successfully"));
});

exports.getMembers = asyncHandler(async (req, res) => {
    const members = await Member.find();

    if (!members) {
        throw new ApiError(404, "No members found");
    }

    return res.status(200).json(new ApiResponse(200, { members }, "Members retrieved successfully"));
});

exports.searchMembers = asyncHandler(async (req, res) => {
    const { name, type } = req.query;

    const query = {};
    if (name) query.name = { $regex: name, $options: "i" };
    if (type) query.type = type;

    const members = await Member.find(query);

    if (!members) {
        throw new ApiError(404, "No members found");
    }

    return res.status(200).json(new ApiResponse(200, { members }, "Members retrieved successfully"));
});
