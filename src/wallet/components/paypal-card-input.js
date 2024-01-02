import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from '../../global-components.js/buttons';
import { Color } from '../../utilities/theme';

const Colors = Color()
export const CardInput = ({
    proceedCallback,
    CancelCallBack,
    setAmount,
    amount
}) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');

    const formatCardNumber = (input) => {
        // Remove non-numeric characters
        const numericInput = input.replace(/\D/g, '');

        // Split into groups of 4 digits
        const formattedInput = numericInput.replace(/(\d{4})(?=\d)/g, '$1 ');

        return formattedInput;
    };

    const formatExpiryDate = (input) => {
        const numericInput = input.replace(/\D/g, '');

        if (numericInput.length <= 2) {
            return numericInput;
        }

        const month = numericInput.slice(0, 2);
        const year = numericInput.slice(2);

        return `${month}/${year}`;
    };

    const maskedCVV = cvv.replace(/\d/g, '*'); // Mask CVV with asterisks

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter amount"
                value={amount}
                onChangeText={(text) => setAmount(text)}
                maxLength={19} // Maximum length with spaces
                placeholderTextColor="#888"
            />
            {/* <TextInput
                style={styles.input}
                placeholder="Expiry Date (MM/YY)"
                value={formatExpiryDate(expiryDate)}
                onChangeText={(text) => setExpiryDate(text)}
                maxLength={5} // Maximum length with slash
                keyboardType="numeric"
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="CVV"
                // value={cvv}
                value={maskedCVV} // Display masked CVV
                onChangeText={(text) => setCVV(text)}
                maxLength={3}
                keyboardType="numeric"
                placeholderTextColor="#888"
            /> */}

            <Button
                text="Proceed"
                callBack={() => {
                    proceedCallback()
                }}
                TextColor={Colors.white}
                primary
                style={{
                    marginTop: 20
                }}
            />
            {/* <Button
                text="Change payment method"
                callBack={() => {
                    CancelCallBack()
                }}
                TextColor={Colors.primary}
                style={{
                    marginTop: 20,
                    // backgroundColor: Colors.secondary
                }}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: "black"
    },
});

// export default CardInput;