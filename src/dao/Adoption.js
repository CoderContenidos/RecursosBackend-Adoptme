import adoptionModel from "./models/Adoption.js";

export default class Adoption {

    get = (params) =>{
        return adoptionModel.find(params);
    }

    getBy = (params) =>{
        return adoptionModel.findOne(params);
    }

    save = (doc) =>{
        return adoptionModel.create(doc);
    }

    update = (id,doc) =>{
        return adoptionModel.findByIdAndUpdate(id,{$set:doc})
    }
    
    delete = (id) =>{
        return adoptionModel.findByIdAndDelete(id);
    }
}