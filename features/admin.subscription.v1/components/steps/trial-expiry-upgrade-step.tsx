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

import Button from "@oxygen-ui/react/Button";
import DialogActions from "@oxygen-ui/react/DialogActions";
import Grid from "@oxygen-ui/react/Grid";
import Link from "@oxygen-ui/react/Link";
import Stack from "@oxygen-ui/react/Stack";
import Typography from "@oxygen-ui/react/Typography";
import { ArrowLeftIcon, ArrowUpRightFromSquareIcon, CheckIcon } from "@oxygen-ui/react-icons";
import { IdentifiableComponentInterface } from "@wso2is/core/models";
import React, { FunctionComponent, ReactElement, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TRIAL_EXPIRY_UPGRADE_FEATURE_COLUMNS, TrialExpiryComponentIds } from "../../constants";
import {
    TrialExpiryFeatureCheck,
    TrialExpiryOfferPanel,
    TrialExpiryStepContent
} from "../shared/trial-expiry-wizard-styles";

interface TrialExpiryUpgradeStepPropsInterface extends IdentifiableComponentInterface {
    /**
     * Returns the wizard to the changes summary step.
     */
    onPrevious: () => void;
    /**
     * Closes the wizard, leaving the tenant on the free plan.
     */
    onStayOnFree: () => void;
    /**
     * Public pricing page, opened by the "View Plans" action.
     */
    pricingUrl: string;
    /**
     * Name of the tier being offered, e.g. "Growth".
     */
    tierName: string;
    /**
     * Destination opened by the upgrade call to action.
     */
    upgradeUrl: string;
}

/**
 * Second step of the trial expiry wizard. Presents the paid tier benefits and the
 * upgrade call to action, with the option to stay on the free plan.
 *
 * @param props - Component props.
 * @returns Upgrade offer step.
 */
const TrialExpiryUpgradeStep: FunctionComponent<TrialExpiryUpgradeStepPropsInterface> = (
    props: TrialExpiryUpgradeStepPropsInterface
): ReactElement => {
    const {
        ["data-componentid"]: componentId = TrialExpiryComponentIds.UPGRADE_STEP,
        onPrevious,
        onStayOnFree,
        pricingUrl,
        tierName,
        upgradeUrl
    } = props;

    const { t } = useTranslation();

    const handleUpgrade: () => void = useCallback((): void => {
        window.open(upgradeUrl, "_blank", "noopener,noreferrer");
    }, [ upgradeUrl ]);

    return (
        <>
            <TrialExpiryStepContent dividers data-componentid={ componentId }>
                <TrialExpiryOfferPanel elevation={ 0 } data-componentid={ `${ componentId }-offer-panel` }>
                    <Typography variant="h6">
                        { t("console:common.trialExpiry.upgrade.offer.title", { tierName }) }
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={ { mb: 3, mt: 0.5 } }>
                        { t("console:common.trialExpiry.upgrade.offer.pricing") }{ " " }
                        <Link
                            data-componentid={ `${ componentId }-view-plans-link` }
                            href={ pricingUrl }
                            rel="noopener noreferrer"
                            sx={ {
                                alignItems: "center",
                                display: "inline-flex",
                                gap: 0.5
                            } }
                            target="_blank"
                        >
                            { t("console:common.trialExpiry.upgrade.offer.viewPlansAction") }
                            <ArrowUpRightFromSquareIcon size={ 12 } />
                        </Link>
                    </Typography>

                    <Grid container spacing={ 2 }>
                        { TRIAL_EXPIRY_UPGRADE_FEATURE_COLUMNS.map((column: string[]) => (
                            <Grid key={ column[0] } xs={ 12 } sm={ 6 }>
                                <Stack spacing={ 1.5 }>
                                    { column.map((featureKey: string) => (
                                        <Stack key={ featureKey } direction="row" spacing={ 1.5 }>
                                            <TrialExpiryFeatureCheck>
                                                <CheckIcon size={ 14 } />
                                            </TrialExpiryFeatureCheck>
                                            <Typography variant="body1">
                                                { t(featureKey) }
                                            </Typography>
                                        </Stack>
                                    )) }
                                </Stack>
                            </Grid>
                        )) }
                    </Grid>

                    <Button
                        data-componentid={ `${ componentId }-upgrade-button` }
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        sx={ { mt: 4 } }
                        onClick={ handleUpgrade }
                    >
                        { t("console:common.trialExpiry.upgrade.offer.action") }
                    </Button>
                </TrialExpiryOfferPanel>
            </TrialExpiryStepContent>

            <DialogActions sx={ { px: 3, py: 2 } }>
                <Stack direction="row" justifyContent="space-between" sx={ { width: "100%" } }>
                    <Button
                        data-componentid={ `${ componentId }-previous-button` }
                        color="primary"
                        startIcon={ <ArrowLeftIcon size={ 14 } /> }
                        onClick={ onPrevious }
                    >
                        { t("console:common.trialExpiry.actions.previous") }
                    </Button>
                    <Button
                        data-componentid={ `${ componentId }-stay-on-free-button` }
                        variant="outlined"
                        color="primary"
                        onClick={ onStayOnFree }
                    >
                        { t("console:common.trialExpiry.actions.stayOnFree") }
                    </Button>
                </Stack>
            </DialogActions>
        </>
    );
};

export default TrialExpiryUpgradeStep;
