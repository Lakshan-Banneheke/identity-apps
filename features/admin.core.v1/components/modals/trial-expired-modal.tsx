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
import "./trial-expired-modal.scss";

/**
 * Props interface for the TrialExpiredModal component.
 */
interface TrialExpiredModalPropsInterface extends IdentifiableComponentInterface {
    open: boolean;
    onClose: () => void;
    onUpgrade: () => void;
}

/**
 * Feature item interface for the expired trial features list.
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
 * Features that are now restricted after trial expiration.
 */
const EXPIRED_TRIAL_FEATURES: TrialFeatureItemInterface[] = [
    {
        description: "Advanced authentication, branding, and more are now restricted",
        name: "Premium Features Restricted"
    },
    {
        description: "Monthly active user and machine-to-machine token limits have been reduced",
        name: "Reduced Usage Limits"
    },
    {
        description: "Quotas for applications, social IdP connections, and more have been lowered",
        name: "Reduced Resource Quotas"
    }
];

/**
 * Trial Expired modal component displayed when the user's trial period has ended.
 * Presents what features are now restricted and prompts the user to upgrade.
 *
 * @param props - Props injected to the component.
 * @returns Trial Expired modal ReactElement.
 */
const TrialExpiredModal: FunctionComponent<TrialExpiredModalPropsInterface> = ({
    "data-componentid": componentId = "trial-expired-modal",
    onClose,
    onUpgrade,
    open
}: TrialExpiredModalPropsInterface): ReactElement => {
    /**
     * Handles the upgrade CTA click.
     */
    const handleUpgrade: () => void = (): void => {
        onUpgrade();
        onClose();
    };

    return (
        <Modal
            open={open}
            className="trial-expired-modal"
            size="small"
            dimmer="blurring"
            closeOnDimmerClick={false}
            closeOnEscape={false}
            data-componentid={componentId}
        >
            <div className="trial-expired-modal-header">
                <div className="trial-expired-modal-badge">
                    <span className="badge-dot" />
                    Trial Expired
                </div>
                <h2 className="trial-expired-modal-title">Your trial has expired</h2>
                <p className="trial-expired-modal-subtitle">
                    Your 30-day free trial has ended. Premium features are now limited. <br />
                    <b>Upgrade your plan to restore full access.</b>
                </p>
            </div>

            <Modal.Content className="trial-expired-modal-body">
                <div className="trial-expired-features-label">What&apos;s now restricted</div>
                <div className="trial-expired-features-list">
                    {EXPIRED_TRIAL_FEATURES.map((feature: TrialFeatureItemInterface) => (
                        <div
                            key={feature.name}
                            className="trial-expired-feature-item"
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

            <Modal.Actions className="trial-expired-modal-actions">
                <PrimaryButton
                    onClick={handleUpgrade}
                    data-componentid={`${componentId}-upgrade-button`}
                >
                    Upgrade Now
                </PrimaryButton>
            </Modal.Actions>
        </Modal>
    );
};

export default TrialExpiredModal;
