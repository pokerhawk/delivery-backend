import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { fixedDate, dateProps } from 'src/utils/date/adjust-date';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: ClientService,
    ){}

    async getUserById(id:string){
        const user = await this.prisma.user.findUnique({where: {id: id}});        
        return {...user};
    }
}