import Leucine from "../components/proteins/aminoacids/essentials/leucine";
import Isoleucine from "../components/proteins/aminoacids/essentials/isoleucine";
import Valine from "../components/proteins/aminoacids/essentials/valine";
import Lysine from "../components/proteins/aminoacids/essentials/lysine";
import Methionine from "../components/proteins/aminoacids/essentials/methionine";
import Phenylalanine from "../components/proteins/aminoacids/essentials/phenylalanine";
import Threonine from "../components/proteins/aminoacids/essentials/threonine";
import Tryptophan from "../components/proteins/aminoacids/essentials/tryptophan";
import Histidine from "../components/proteins/aminoacids/essentials/histidine";
import Alanine from "../components/proteins/aminoacids/nonessentials/alanine";
import Arginine from "../components/proteins/aminoacids/nonessentials/arginine";
import Asparagine from "../components/proteins/aminoacids/nonessentials/asparagine";
import AsparticAcid from "../components/proteins/aminoacids/nonessentials/asparticacid";
import Cysteine from "../components/proteins/aminoacids/nonessentials/cysteine";
import GlutamicAcid from "../components/proteins/aminoacids/nonessentials/glutamicacid";
import Glutamine from "../components/proteins/aminoacids/nonessentials/glutamine";
import Glycine from "../components/proteins/aminoacids/nonessentials/glycine";
import Proline from "../components/proteins/aminoacids/nonessentials/proline";
import Serine from "../components/proteins/aminoacids/nonessentials/serine";
import Tyrosine from "../components/proteins/aminoacids/nonessentials/tyrosine";

export const AminoMap = {
    Leucine,
    Isoleucine,
    Valine,
    Lysine,
    Methionine,
    Phenylalanine,
    Threonine,
    Tryptophan,
    Histidine,
    Alanine,
    Arginine,
    Asparagine,
    AsparticAcid,
    Cysteine,
    GlutamicAcid,
    Glutamine,
    Glycine,
    Proline,
    Serine,
    Tyrosine,
} as const;