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
import { PrimaryButton, SecondaryButton } from "@wso2is/react-components";
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
 * Check icon SVG component for the benefit list items.
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
 * Upgrade benefit item interface for the benefits list.
 */
interface UpgradeBenefitItemInterface {
    name: string;
    description: string;
}

/**
 * Benefits that users get back by upgrading to a paid plan.
 */
const UPGRADE_BENEFITS: UpgradeBenefitItemInterface[] = [
    {
        description: "Restore premium authentication, branding, and other advanced capabilities",
        name: "Premium Feature Access"
    },
    {
        description: "Get back expanded monthly active user and machine-to-machine token limits",
        name: "Higher Usage Limits"
    },
    {
        description: "Increased quotas for applications, connections, and other resources",
        name: "Higher Resource Quotas"
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
                <h2 className="trial-expired-modal-title">Your trial has ended — what&apos;s next?</h2>
                <p className="trial-expired-modal-subtitle">
                    Your organization is now on the <b>Free plan</b>. You can keep building, but some
                    capabilities from your trial are no longer active. <br />
                    <b>Upgrade to pick up right where you left off.</b>
                </p>
            </div>

            <Modal.Content className="trial-expired-modal-body">
                <div className="trial-expired-changes-label">
                    What you get back
                </div>
                <div className="trial-expired-changes-list">
                    { UPGRADE_BENEFITS.map((benefit: UpgradeBenefitItemInterface, index: number) => (
                        <div
                            key={ benefit.name }
                            className="trial-expired-change-item"
                            data-componentid={ `${componentId}-benefit-${index}` }
                        >
                            <div className="change-check">
                                <CheckIcon />
                            </div>
                            <div className="change-text">
                                <div className="change-name">{ benefit.name }</div>
                                <div className="change-desc">{ benefit.description }</div>
                            </div>
                        </div>
                    )) }
                </div>
                <div className="trial-expired-note">
                    Your data and configurations are completely safe — nothing has been deleted.
                    Upgrade anytime to restore full access.
                </div>
            </Modal.Content>

            <Modal.Actions className="trial-expired-modal-actions">
                <PrimaryButton
                    onClick={ handleUpgrade }
                    data-componentid={ `${componentId}-upgrade-button` }
                >
                    Upgrade Your Plan
                </PrimaryButton>
                <SecondaryButton
                    onClick={ onClose }
                    data-componentid={ `${componentId}-continue-free-button` }
                >
                    Continue on Free Tier
                </SecondaryButton>
                <p className="trial-expired-support-note">
                    Need more time? { " " }
                    <a href="mailto:asgardeo-help@wso2.com">Contact us</a>
                    { " " }for a limited trial extension.
                </p>
            </Modal.Actions>
        </Modal>
    );
};

export default TrialExpiredModal;
