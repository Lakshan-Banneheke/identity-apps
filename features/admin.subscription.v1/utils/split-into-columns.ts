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

/**
 * Splits items into the given number of columns, filling each column top to bottom before moving
 * to the next. Trailing empty columns are dropped, so a short list does not leave gaps in the
 * layout.
 *
 * @param items - Items to lay out, in display order.
 * @param columnCount - Number of columns to spread the items across.
 * @returns Items grouped per column.
 */
export const splitIntoColumns = <T>(items: T[], columnCount: number): T[][] => {
    if (!items?.length || columnCount < 1) {
        return [];
    }

    const itemsPerColumn: number = Math.ceil(items.length / columnCount);
    const columns: T[][] = [];

    for (let index: number = 0; index < items.length; index += itemsPerColumn) {
        columns.push(items.slice(index, index + itemsPerColumn));
    }

    return columns;
};
