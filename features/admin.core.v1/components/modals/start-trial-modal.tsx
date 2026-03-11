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

import { BrandingWatermark, Security, Speed, SupportAgent } from "@mui/icons-material";
import Box from "@oxygen-ui/react/Box";
import Paper from "@oxygen-ui/react/Paper";
import Typography from "@oxygen-ui/react/Typography";
import { IdentifiableComponentInterface } from "@wso2is/core/models";
import { Heading, PrimaryButton, Button as SemanticButton } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Message, Modal } from "semantic-ui-react";
import "./start-trial-modal.scss";

/**
 * Props interface for the StartTrialModal component.
 */
interface StartTrialModalPropsInterface extends IdentifiableComponentInterface {
    open: boolean;
    onClose: () => void;
    onStartTrial: () => void;
}

/**
 * Feature item interface for the trial features list.
 */
interface TrialFeatureItemInterface {
    icon: ReactElement;
    name: string;
    description: string;
}

/**
 * Trial features to display in the modal.
 */
const TRIAL_FEATURES: TrialFeatureItemInterface[] = [
    {
        description: "Configure conditional scripts and adaptive authentication flows.",
        icon: <Security fontSize="large" color="inherit" />,
        name: "Advanced Authentication"
    },
    {
        description: "Customize login pages, emails, and organization branding.",
        icon: <BrandingWatermark fontSize="large" color="inherit" />,
        name: "Full Branding Suite"
    },
    {
        description: "Priority support with dedicated response SLAs.",
        icon: <SupportAgent fontSize="large" color="inherit" />,
        name: "Premium Support"
    },
    {
        description: "Expanded MAU limits and API rate limits.",
        icon: <Speed fontSize="large" color="inherit" />,
        name: "Higher Usage Limits"
    }
];

/**
 * Start Trial modal component displayed when users click the "Start Trial"
 * button in the header. Presents trial benefits and allows users to
 * initiate a trial subscription.
 *
 * @param props - Props injected to the component.
 * @returns Start Trial modal ReactElement.
 */
const StartTrialModal: FunctionComponent<StartTrialModalPropsInterface> = ({
    "data-componentid": componentId = "start-trial-modal",
    onClose,
    onStartTrial,
    open
}: StartTrialModalPropsInterface): ReactElement => {

    const { t } = useTranslation();

    /**
     * Handles the start trial CTA click.
     */
    const handleStartTrial: () => void = (): void => {
        onStartTrial();
        onClose();
    };

    return (
        <Modal
            open={ open }
            className="wizard action-create-wizard"
            dimmer="blurring"
            size="small"
            onClose={ onClose }
            closeOnDimmerClick={ false }
            closeOnEscape
            data-componentid={ componentId }
        >
            <Modal.Header className="wizard-header">
                Start Your 30-Day Free Trial
                <Heading as="h6">
                    Experience enterprise-grade identity management with all premium
                    features included. No credit card required.
                </Heading>
            </Modal.Header>
            <Modal.Content className="content-container" scrolling>
                <Message info>
                    Your current configuration and data will be preserved.
                    Downgrade anytime before the trial ends.
                </Message>

                <Box display="flex" flexDirection="column" gap={ 3 } width="100%">
                    <Box display="flex" gap={ 3 }>
                        { TRIAL_FEATURES.slice(0, 2).map((feature: TrialFeatureItemInterface) => (
                            <Paper
                                key={ feature.name }
                                elevation={ 3 }
                                sx={ {
                                    alignItems: "flex-start",
                                    borderLeft: 4,
                                    borderLeftColor: "primary.main",
                                    borderLeftStyle: "solid",
                                    display: "flex",
                                    flex: 1,
                                    flexDirection: "column",
                                    gap: 1.5,
                                    p: 2
                                } }
                                data-componentid={ `${componentId}-feature-${feature.name}` }
                            >
                                <Box color="primary.main" mb={ 1 }>
                                    { feature.icon }
                                </Box>
                                <Typography variant="subtitle1" fontWeight={ 600 }>
                                    { feature.name }
                                </Typography>
                                <Typography variant="body2">
                                    { feature.description }
                                </Typography>
                            </Paper>
                        )) }
                    </Box>
                    <Box display="flex" gap={ 3 }>
                        { TRIAL_FEATURES.slice(2, 4).map((feature: TrialFeatureItemInterface) => (
                            <Paper
                                key={ feature.name }
                                elevation={ 3 }
                                sx={ {
                                    alignItems: "flex-start",
                                    borderLeft: 4,
                                    borderLeftColor: "primary.main",
                                    borderLeftStyle: "solid",
                                    display: "flex",
                                    flex: 1,
                                    flexDirection: "column",
                                    gap: 1.5,
                                    p: 2
                                } }
                                data-componentid={ `${componentId}-feature-${feature.name}` }
                            >
                                <Box color="primary.main" mb={ 1 }>
                                    { feature.icon }
                                </Box>
                                <Typography variant="subtitle1" fontWeight={ 600 }>
                                    { feature.name }
                                </Typography>
                                <Typography variant="body2">
                                    { feature.description }
                                </Typography>
                            </Paper>
                        )) }
                    </Box>
                </Box>
            </Modal.Content>
            <Modal.Actions>
                <Grid>
                    <Grid.Row columns={ 2 }>
                        <Grid.Column mobile={ 8 } tablet={ 8 } computer={ 8 }>
                            <SemanticButton
                                className="link-button"
                                basic
                                primary
                                floated="left"
                                onClick={ onClose }
                                data-componentid={ `${componentId}-cancel-button` }
                            >
                                { t("common:cancel") }
                            </SemanticButton>
                        </Grid.Column>
                        <Grid.Column mobile={ 8 } tablet={ 8 } computer={ 8 }>
                            <PrimaryButton
                                onClick={ handleStartTrial }
                                data-componentid={ `${componentId}-start-button` }
                            >
                                Start My Free Trial
                            </PrimaryButton>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Modal.Actions>
        </Modal>
    );
};

export default StartTrialModal;
