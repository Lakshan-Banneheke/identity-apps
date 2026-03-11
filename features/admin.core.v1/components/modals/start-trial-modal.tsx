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

import { IdentifiableComponentInterface } from "@wso2is/core/models";
import React, { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "semantic-ui-react";
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
    name: string;
    description: string;
}

/**
 * Check icon SVG component for the feature list items.
 *
 * @returns SVG ReactElement for the check icon.
 */
const CheckIcon = (): ReactElement => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

/**
 * Trial features to display in the modal.
 */
const TRIAL_FEATURES: TrialFeatureItemInterface[] = [
    {
        description: "Configure conditional scripts and adaptive flows",
        name: "Advanced Authentication"
    },
    {
        description: "Customize login pages, emails, and branding",
        name: "Full Branding Suite"
    },
    {
        description: "Priority support with dedicated response SLAs",
        name: "Premium Support"
    },
    {
        description: "Expanded MAU limits and API rate limits",
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
            onClose={ onClose }
            className="start-trial-modal"
            size="small"
            dimmer="blurring"
            closeOnDimmerClick
            closeOnEscape
            data-componentid={ componentId }
        >
            <div className="start-trial-modal-header">
                <div className="start-trial-modal-badge">
                    <span className="badge-dot" />
                    30-Day Free Trial
                </div>
                <h2 className="start-trial-modal-title">
                    Unlock the Full Power of Asgardeo
                </h2>
                <p className="start-trial-modal-subtitle">
                    Experience enterprise-grade identity management with all premium
                    features included. No credit card required.
                </p>
            </div>

            <Modal.Content className="start-trial-modal-body">
                <div className="start-trial-features-label">
                    What you get
                </div>
                <div className="start-trial-features-list">
                    { TRIAL_FEATURES.map((feature: TrialFeatureItemInterface) => (
                        <div
                            key={ feature.name }
                            className="start-trial-feature-item"
                            data-componentid={ `${componentId}-feature-${feature.name}` }
                        >
                            <div className="feature-check">
                                <CheckIcon />
                            </div>
                            <div className="feature-text">
                                <div className="feature-name">{ feature.name }</div>
                                <div className="feature-desc">{ feature.description }</div>
                            </div>
                        </div>
                    )) }
                </div>
                <div className="start-trial-note">
                    <span className="note-icon">&#9432;</span>
                    Your current configuration and data will be preserved.
                    Downgrade anytime before the trial ends.
                </div>
            </Modal.Content>

            <Modal.Actions className="start-trial-modal-actions">
                <button
                    className="start-trial-cancel"
                    onClick={ onClose }
                    data-componentid={ `${componentId}-cancel-button` }
                >
                    { t("common:cancel") }
                </button>
                <button
                    className="start-trial-cta"
                    onClick={ handleStartTrial }
                    data-componentid={ `${componentId}-start-button` }
                >
                    Start My Free Trial
                </button>
            </Modal.Actions>
        </Modal>
    );
};

export default StartTrialModal;
