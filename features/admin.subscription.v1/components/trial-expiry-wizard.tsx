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

import Dialog from "@oxygen-ui/react/Dialog";
import DialogTitle from "@oxygen-ui/react/DialogTitle";
import Typography from "@oxygen-ui/react/Typography";
import { IdentifiableComponentInterface } from "@wso2is/core/models";
import React, { FunctionComponent, ReactElement, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TrialExpiryComponentIds } from "../constants";
import { useTrialExpiryWizard } from "../hooks/use-trial-expiry-wizard";
import { TrialExpiryStep } from "../models/trial-expiry";
import TrialExpiryChangesStep from "./steps/trial-expiry-changes-step";
import TrialExpiryUpgradeStep from "./steps/trial-expiry-upgrade-step";

/**
 * Props interface for the TrialExpiryWizard component.
 */
type TrialExpiryWizardPropsInterface = IdentifiableComponentInterface;

/**
 * Two step wizard shown once the tenant's trial has ended. The first step explains what
 * changed on the downgrade to the free plan and the second offers the upgrade path back.
 *
 * Neither the escape key nor a backdrop click dismisses the dialog, so it is closed only
 * through an explicit action: Close on the first step, or Stay on free on the second.
 *
 * @param props - Component props.
 * @returns Trial expiry wizard.
 */
const TrialExpiryWizard: FunctionComponent<TrialExpiryWizardPropsInterface> = (
    props: TrialExpiryWizardPropsInterface
): ReactElement => {
    const {
        ["data-componentid"]: componentId = TrialExpiryComponentIds.WIZARD
    } = props;

    const { t } = useTranslation();

    const {
        closeWizard,
        currentStep,
        goToNextStep,
        goToPreviousStep,
        isOpen,
        pricingUrl,
        tierName,
        upgradeUrl
    } = useTrialExpiryWizard();

    const isUpgradeStep: boolean = currentStep === TrialExpiryStep.UPGRADE;
    const titleKey: string = isUpgradeStep
        ? "console:common.trialExpiry.upgrade.title"
        : "console:common.trialExpiry.changes.title";
    const subtitleKey: string = isUpgradeStep
        ? "console:common.trialExpiry.upgrade.subtitle"
        : "console:common.trialExpiry.changes.subtitle";

    const handleClose: (_event: object, _reason: string) => void = useCallback(
        (_event: object, reason: string): void => {
            if (reason === "backdropClick") {
                return;
            }

            closeWizard();
        },
        [ closeWizard ]
    );

    if (!isOpen) {
        return null;
    }

    return (
        <Dialog
            open={ isOpen }
            onClose={ handleClose }
            maxWidth="md"
            fullWidth
            disableEscapeKeyDown
            data-componentid={ componentId }
        >
            <DialogTitle component="div">
                <Typography variant="h5">
                    { t(titleKey, { tierName }) }
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={ { mt: 0.75 } }>
                    { t(subtitleKey, { tierName }) }
                </Typography>
            </DialogTitle>

            { isUpgradeStep
                ? (
                    <TrialExpiryUpgradeStep
                        data-componentid={ `${ componentId }-upgrade-step` }
                        onPrevious={ goToPreviousStep }
                        onStayOnFree={ closeWizard }
                        pricingUrl={ pricingUrl }
                        tierName={ tierName }
                        upgradeUrl={ upgradeUrl }
                    />
                )
                : (
                    <TrialExpiryChangesStep
                        data-componentid={ `${ componentId }-changes-step` }
                        onClose={ closeWizard }
                        onNext={ goToNextStep }
                    />
                )
            }
        </Dialog>
    );
};

export default TrialExpiryWizard;
