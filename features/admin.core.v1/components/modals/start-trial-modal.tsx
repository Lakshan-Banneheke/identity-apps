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
import { PrimaryButton } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement } from "react";
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
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

/**
 * Trial features to display in the modal.
 */
const TRIAL_FEATURES: TrialFeatureItemInterface[] = [
    {
        description: "Unlock advanced authentication, branding, and more",
        name: "Access to Premium Features",
    },
    {
        description: "Expanded monthly active user and machine-to-machine token limits",
        name: "Higher Usage Limits",
    },
    {
        description: "Increased quotas for applications, social idp connections, and more",
        name: "Higher Resource Quotas",
    },
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
    open,
}: StartTrialModalPropsInterface): ReactElement => {
    /**
     * Handles the start trial CTA click.
     */
    const handleStartTrial: () => void = (): void => {
        onStartTrial();
        onClose();
    };

    return (
        <Modal
            open={open}
            className="start-trial-modal"
            size="small"
            dimmer="blurring"
            closeOnDimmerClick={false}
            closeOnEscape={false}
            data-componentid={componentId}
        >
            <div className="start-trial-modal-header">
                <div className="start-trial-modal-badge">
                    <span className="badge-dot" />
                    30-Day Free Trial
                </div>
                <h2 className="start-trial-modal-title">Premium capabilities unlocked!</h2>
                <p className="start-trial-modal-subtitle">
                    Get started with more features and higher usage limits on your organization for 30 days. No credit card required.
                </p>
            </div>

            <Modal.Content className="start-trial-modal-body">
                <div className="start-trial-features-label">What you get</div>
                <div className="start-trial-features-list">
                    {TRIAL_FEATURES.map((feature: TrialFeatureItemInterface) => (
                        <div
                            key={feature.name}
                            className="start-trial-feature-item"
                            data-componentid={`${componentId}-feature-${feature.name}`}
                        >
                            <div className="feature-check">
                                <CheckIcon />
                            </div>
                            <div className="feature-text">
                                <div className="feature-name">{feature.name}</div>
                                <div className="feature-desc">{feature.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal.Content>

            <Modal.Actions className="start-trial-modal-actions">
                <PrimaryButton
                    onClick={handleStartTrial}
                    data-componentid={`${componentId}-start-button`}
                >
                    Let&apos;s go
                </PrimaryButton>
            </Modal.Actions>
        </Modal>
    );
};

export default StartTrialModal;
