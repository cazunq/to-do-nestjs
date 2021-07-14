import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    transform(value: any){
        value = value.toUpperCase();

        if(!this.isSatusValid(value)){
            throw new BadRequestException('"$(value)" is an invalid status');
        }

        return value;
    }

    private isSatusValid(status: any){
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}