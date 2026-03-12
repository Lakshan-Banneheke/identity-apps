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
 * Cross icon SVG component for the restriction list items.
 *
 * @returns SVG ReactElement for the cross icon.
 */
const CrossIcon = (): ReactElement => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

/**
 * Free plan change item interface for the changes list.
 */
interface FreePlanChangeItemInterface {
    name: string;
    description: string;
}

/**
 * Changes that take effect when moving to the Free plan after trial expiration.
 */
const FREE_PLAN_CHANGES: FreePlanChangeItemInterface[] = [
    {
        description: "Advanced features such as authentication and branding are no longer available",
        name: "Premium Features Removed"
    },
    {
        description: "Reduced monthly active user and machine-to-machine token limits",
        name: "Lower Usage Limits"
    },
    {
        description: "Quotas for applications, connections, and other resources are reduced, which may disable excess resources",
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
                    Your 30-day free trial has ended. Premium capabilities are now limited. <br />
                    <b>Upgrade your plan to restore full access.</b>
                </p>
            </div>

            <Modal.Content className="trial-expired-modal-body">
                <div className="trial-expired-changes-label">
                    What happens if you continue on the Free Tier
                </div>
                <div className="trial-expired-changes-list">
                    { FREE_PLAN_CHANGES.map((change: FreePlanChangeItemInterface, index: number) => (
                        <div
                            key={ change.name }
                            className="trial-expired-change-item"
                            data-componentid={ `${componentId}-change-${index}` }
                        >
                            <div className="change-icon">
                                <CrossIcon />
                            </div>
                            <div className="change-text">
                                <div className="change-name">{ change.name }</div>
                                <div className="change-desc">{ change.description }</div>
                            </div>
                        </div>
                    )) }
                </div>
                <div className="trial-expired-note">
                    You can upgrade anytime and regain access to all your previous features and resources. Nothing has been deleted.
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
            </Modal.Actions>
        </Modal>
    );
};

export default TrialExpiredModal;
