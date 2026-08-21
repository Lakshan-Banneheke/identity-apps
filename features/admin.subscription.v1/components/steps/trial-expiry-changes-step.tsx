/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Theme, alpha } from "@mui/material/styles";
import Button from "@oxygen-ui/react/Button";
import DialogActions from "@oxygen-ui/react/DialogActions";
import Grid from "@oxygen-ui/react/Grid";
import Stack from "@oxygen-ui/react/Stack";
import Typography from "@oxygen-ui/react/Typography";
import { Icon } from "@oxygen-ui/react-icons";
import { IdentifiableComponentInterface } from "@wso2is/core/models";
import React, { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { TRIAL_EXPIRY_SUMMARY_CARDS, TrialExpiryComponentIds } from "../../constants";
import {
    TrialExpiryCardVariant,
    TrialExpiryChangesContentInterface,
    TrialExpirySummaryCardContentInterface,
    TrialExpirySummaryCardInterface
} from "../../models/trial-expiry";
import {
    TrialExpiryIconTile,
    TrialExpiryItemList,
    TrialExpiryStepContent,
    TrialExpirySummaryCard
} from "../shared/trial-expiry-wizard-styles";

interface TrialExpiryChangesStepPropsInterface extends IdentifiableComponentInterface {
    /**
     * Configured copy of the step.
     */
    content: TrialExpiryChangesContentInterface;
    /**
     * Closes the wizard without viewing the upgrade offer.
     */
    onClose: () => void;
    /**
     * Advances the wizard to the upgrade step.
     */
    onNext: () => void;
}

/**
 * First step of the trial expiry wizard. Summarises what the tenant keeps on the free plan,
 * what has been disabled, and reassures that nothing has been deleted.
 *
 * @param props - Component props.
 * @returns Changes summary step.
 */
const TrialExpiryChangesStep: FunctionComponent<TrialExpiryChangesStepPropsInterface> = (
    props: TrialExpiryChangesStepPropsInterface
): ReactElement => {
    const {
        content,
        ["data-componentid"]: componentId = TrialExpiryComponentIds.CHANGES_STEP,
        onClose,
        onNext
    } = props;

    const { t } = useTranslation();

    return (
        <>
            <TrialExpiryStepContent dividers data-componentid={ componentId }>
                <Grid container spacing={ 3 }>
                    { TRIAL_EXPIRY_SUMMARY_CARDS.map((card: TrialExpirySummaryCardInterface) => {
                        const CardIcon: Icon = card.icon;
                        const cardContent: TrialExpirySummaryCardContentInterface =
                            card.resolveContent(content);

                        if (!cardContent) {
                            return null;
                        }

                        return (
                            <Grid key={ card.key } xs={ 12 } md={ 4 }>
                                <TrialExpirySummaryCard
                                    elevation={ 0 }
                                    data-componentid={ `${ componentId }-${ card.key }-card` }
                                >
                                    <Stack direction="row" spacing={ 2 } alignItems="center">
                                        <TrialExpiryIconTile
                                            sx={ {
                                                backgroundColor: (theme: Theme) =>
                                                    alpha(theme.palette[card.tone].main, 0.12),
                                                color: (theme: Theme) => theme.palette[card.tone].main
                                            } }
                                        >
                                            <CardIcon size={ 20 } />
                                        </TrialExpiryIconTile>
                                        <Typography variant="h6">
                                            { cardContent.title }
                                        </Typography>
                                    </Stack>

                                    { /* Kept in their own tighter stack so the lead-in line sits
                                          closer to its list than the card's own gap allows. */ }
                                    <Stack spacing={ 1 }>
                                        { cardContent.description && (
                                            <Typography variant="body2" color="text.secondary">
                                                { cardContent.description }
                                            </Typography>
                                        ) }

                                        { card.variant === TrialExpiryCardVariant.LIST
                                            ? (
                                                <TrialExpiryItemList component="ul">
                                                    { cardContent.items?.map((item: string) => (
                                                        <Typography
                                                            key={ item }
                                                            component="li"
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            { item }
                                                        </Typography>
                                                    )) }
                                                </TrialExpiryItemList>
                                            )
                                            : (
                                                <Stack spacing={ 2 }>
                                                    { cardContent.items?.map((item: string) => (
                                                        <Typography
                                                            key={ item }
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            { item }
                                                        </Typography>
                                                    )) }
                                                </Stack>
                                            )
                                        }
                                    </Stack>
                                </TrialExpirySummaryCard>
                            </Grid>
                        );
                    }) }
                </Grid>
            </TrialExpiryStepContent>

            <DialogActions sx={ { px: 3, py: 2 } }>
                <Stack direction="row" justifyContent="space-between" sx={ { width: "100%" } }>
                    <Button
                        data-componentid={ `${ componentId }-close-button` }
                        color="primary"
                        onClick={ onClose }
                    >
                        { t("common:close") }
                    </Button>
                    <Button
                        data-componentid={ `${ componentId }-next-button` }
                        variant="contained"
                        color="primary"
                        onClick={ onNext }
                    >
                        { t("console:common.trialExpiry.actions.next") }
                    </Button>
                </Stack>
            </DialogActions>
        </>
    );
};

export default TrialExpiryChangesStep;
