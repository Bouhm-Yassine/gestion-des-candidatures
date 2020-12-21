import { PipeTransform, Pipe } from '@angular/core';
import { Stagiere } from 'src/app/Interfaces/stagiere.interface';

@Pipe({
    name: 'stagiereFilter'
})
export class StagiereFilterPipe implements PipeTransform {
    transform(stagieres: Stagiere[], searchTerm: string): Stagiere[] {
        if (!stagieres || !searchTerm) {
            return stagieres;
        }

        return stagieres.filter(stagiere =>
            stagiere.NomComplet.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}