import { criarvaga } from "./acoes";

export default function NovaVaga() {
    return (
        < form action={criarvaga} >
            <input name="titulo" />
            <button>Publicar </button>
        </form >
    );
}