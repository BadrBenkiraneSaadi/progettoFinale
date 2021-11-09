import { IUtente } from './iutente';
import { IStatofattura } from './istatofattura';
import { IProvince } from './iprovince';
import { IFatture } from './ifatture';
import { IComuni } from './icomuni';
import { IClienti } from './iclienti';
export interface IApi {
    content:IClienti|IComuni|IFatture|IProvince|IStatofattura|IUtente,
    /*----------------------------------------------------------------*/
    pageable?: {},
    last?: boolean,
    totalPages?: number,
    totalElements?: number,
    number?: number,
    first?: boolean,
    numberOfElements?: number,
    sort?: {},
    size?: number,
    empty?: boolean
}
