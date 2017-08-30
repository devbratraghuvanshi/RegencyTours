import { Router, Request, Response, NextFunction } from 'express';

export class ActionRouter implements IActionRoute {
    router: Router;
    controller: any;
    constructor(private ctrl: any) {
        this.controller = ctrl;
        this.router = Router();
        this.init();
    }

    
    init(): void {
             this.router.route('/')
            .get(this.controller.get)
            .post(this.controller.add);

            this.router.route('/:id')
            .get(this.controller.getById)
            .put(this.controller.update)
            .patch(this.controller.patch)
            .delete(this.controller.delete);

    }
}

interface IActionRoute {
    router: Router
    controller: any;
}

interface IGetAction {
    Get();
}
interface IPostAction {
    Post();
}
interface IPutAction {
    Put();
}
interface IPatchAction {
    Patch();
}
interface IDeleteAction {
    Delete();
}