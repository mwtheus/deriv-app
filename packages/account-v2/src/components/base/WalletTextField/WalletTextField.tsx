import React, { ChangeEvent, ComponentProps, forwardRef, Ref, useState } from 'react';
import classNames from 'classnames';
import { FormikErrors } from 'formik';
import HelperMessage, { HelperMessageProps } from './HelperMessage';
import './WalletTextField.scss';

export interface WalletTextFieldProps extends ComponentProps<'input'>, HelperMessageProps {
    defaultValue?: string;
    disabled?: boolean;
    errorMessage?: FormikErrors<unknown> | FormikErrors<unknown>[] | string[] | string;
    isInvalid?: boolean;
    label?: string;
    renderLeftIcon?: () => React.ReactNode;
    renderRightIcon?: () => React.ReactNode;
    shouldShowWarningMessage?: boolean;
    showMessage?: boolean;
}

const WalletTextField = forwardRef(
    (
        {
            defaultValue = '',
            disabled,
            errorMessage,
            isInvalid,
            label,
            maxLength,
            message,
            messageVariant = 'general',
            name = 'walletTextField',
            onChange,
            renderLeftIcon,
            renderRightIcon,
            shouldShowWarningMessage = false,
            showMessage = false,
            ...rest
        }: WalletTextFieldProps,
        ref: Ref<HTMLInputElement>
    ) => {
        const [value, setValue] = useState(defaultValue);

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setValue(newValue);
            onChange?.(e);
        };

        return (
            <div
                className={classNames('wallets-textfield', {
                    'wallets-textfield--disabled': disabled,
                    'wallets-textfield--error': isInvalid,
                })}
                data-testid='dt_wallets_textfield'
            >
                <div className='wallets-textfield__box' data-testid='dt_wallets_textfield_box'>
                    {typeof renderLeftIcon === 'function' && (
                        <div className='wallets-textfield__icon-left' data-testid='dt_wallets_textfield_icon_left'>
                            {renderLeftIcon()}
                        </div>
                    )}
                    <input
                        className='wallets-textfield__field'
                        disabled={disabled}
                        id={name}
                        maxLength={maxLength}
                        onChange={handleChange}
                        placeholder={label}
                        ref={ref}
                        value={value}
                        {...rest}
                    />
                    {label && (
                        <label className='wallets-textfield__label' htmlFor={name}>
                            {label}
                        </label>
                    )}
                    {typeof renderRightIcon === 'function' && (
                        <div className='wallets-textfield__icon-right' data-testid='dt_wallets_textfield_icon_right'>
                            {renderRightIcon()}
                        </div>
                    )}
                </div>
                <div className='wallets-textfield__message-container'>
                    {!disabled && (
                        <>
                            {showMessage && !isInvalid && (
                                <HelperMessage
                                    inputValue={value}
                                    maxLength={maxLength}
                                    message={message}
                                    messageVariant={messageVariant}
                                />
                            )}
                            {errorMessage && (isInvalid || (!isInvalid && shouldShowWarningMessage)) && (
                                <HelperMessage
                                    inputValue={value}
                                    isError={isInvalid}
                                    maxLength={maxLength}
                                    message={errorMessage as string}
                                    messageVariant={isInvalid ? 'error' : 'warning'}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    }
);

WalletTextField.displayName = 'WalletTextField';
export default WalletTextField;
