const Project = require("../models/Project");

const createProject = (req, res) => {

    let {name,description} = req.body;

    let data = new Project({
        name: name,
        description: description,
        createdBy: req.user.id
    });

    data.save().then(() => {
        res.send({status: 1,msg: "Project created successfully"});
    })
    .catch((err) => {
        res.send({status: 0,msg: "Project not created",error: err});
    });
};

const getProjects = (req, res) => {

    Project.find().then((projects) => {

        res.send({status: 1,msg: "Projects get successfully",data: projects});

    })
    .catch((err) => {
        res.send({status: 0,msg: "Projects not get",error: err});
     });
};

const updateProject = (req, res) => {

    let { id } = req.params;
    let { name, description, status } = req.body;

    Project.updateOne({_id:id},
        {
            name: name,
            description: description,
            status: status
        },
        { new: true }
    ).then((result) => {

        if (result.matchedCount===0) {
            return res.send({status: 0,msg: "Project not found"});
        }

         res.send({ status: 1,msg: "Project updated successfully"});

    }).catch((err) => {

        res.send({status: 0,msg: "Project not updated",error: err});

    });
};

const deleteProject = (req, res) => {

    let { id } = req.params;

    Project.deleteOne({_id:id}).then((result) => {

        if (result.deletedCount===0) {
            return res.send({status: 0,msg: "Project not found"});
        }

        res.send({status: 1,msg: "Project deleted successfully"});

    })
    .catch((err) => {
        res.send({status: 0,msg: "Project not deleted",error: err});
     });
};

module.exports = {createProject,getProjects,updateProject,deleteProject};