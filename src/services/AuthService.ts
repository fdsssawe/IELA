import api from "../http";

// Command pattern used here to separate the request logic from the service in oreder to make it more testable and flexible

//parent class
class Command {
    execute(...args: any) {
        
        throw new Error('This method must be overwritten! Provided data : ' + args.join(', '));
    }
}

//One of the many child classes representing a specific command (request)
class LoginCommand extends Command {
    execute(email : String, password : String) {
        return api.post('/login', {email, password});
    }
}

class RegistrationCommand extends Command {
    execute(email : String, password : String) {
        return api.post('/registration', {email, password});
    }
}

class LogoutCommand extends Command {
    execute() {
        return api.post('/logout');
    }
}

class GoogleAuthHandleCommand extends Command {
    async execute(email : String, password : String) {
        const isUser = await api.post('/isuser', {email})


        if(isUser.data){

            return {
                response : await api.post('/login', {email, password}),
                job : "login"
            }
        }
        else{
            return {
                response : await api.post('/registration', {email, password}),
                job : "registration"
            }
        }
    }
}

//Service class that will be used to execute the commands

interface AuthServiceInterface {
    commands: object
    executeCommand(commandName: string, ...args: any): any
}

export default class AuthService implements AuthServiceInterface {

    commands: { [key: string]: Command };
    constructor() {
        this.commands = {
            login: new LoginCommand(),
            registration: new RegistrationCommand(),
            logout: new LogoutCommand(),
            googleAuthHandle: new GoogleAuthHandleCommand()
        };
    }

    executeCommand(commandName: string, ...args: any): any {
        if (!this.commands[commandName as keyof AuthServiceInterface['commands']]){
            throw new Error(`Command ${commandName} not found`);
        }
        return this.commands[commandName as keyof AuthServiceInterface['commands']].execute(...args);
    }
}