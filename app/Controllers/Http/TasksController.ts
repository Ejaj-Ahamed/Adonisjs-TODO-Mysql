import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import {rules, schema} from '@ioc:Adonis/Core/Validator'
export default class TasksController {
    public async index({view}:HttpContextContract){
        const tasks = await Task.all();        
        
        return view.render('tasks/index', {tasks})
    }
    public async store({request,response,session}:HttpContextContract){
        const validationSchema = schema.create({
            title:schema.string({trim:true},[
                rules.maxLength(255),
            ]),
        });
        const validatedData = await request.validate({
            schema:validationSchema,
            messages:{
                'title.required':'Enter task title',
                'title.maxLength': 'Task length can not be exceed 255',
            },
        });
        await Task.create({
            title:validatedData.title
        })
        session.flash("successMsg",'Task added')
        return response.redirect('back')
    }
    public async update({response,request,session, params}:HttpContextContract){
        const task = await Task.findOrFail(params.id);
        let isCompleted = request.input('isCompleted'); 
        task.isCompleted = !!isCompleted;
        await task.save();
        session.flash("successMsg",'Task updated');
        return response.redirect('back')
        
    }
    public async destroy({response,session, params}:HttpContextContract){
        const task = await Task.findOrFail(params.id);
        await task.delete();
        session.flash("successMsg",'Task deleted!!!');
        return response.redirect('back')
    }
}
