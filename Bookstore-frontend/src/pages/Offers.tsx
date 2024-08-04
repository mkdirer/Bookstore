import {BlankTile, OpenFormButton} from "../components";
import OffersList from '../components/boxes/OffersList';
import {saveHandler} from "../utils/offerFormButtonsHandler";
import {OfferOperationForm} from "../components/forms/OfferOperationForm";
import i18n from "i18next";

const Offers = () => {
    return (
        <BlankTile>
            <OffersList />
            <OpenFormButton>
                <OfferOperationForm saveHandler={saveHandler} formTitle={i18n.t('add offer') || 'add offer'}/>
            </OpenFormButton>
        </BlankTile>
    );
}

export default Offers;