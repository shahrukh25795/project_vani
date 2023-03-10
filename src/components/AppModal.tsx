
/**
 * 
 * File for global app modal
 * 
 */

import { Modal, StyleSheet, TouchableWithoutFeedback, View, } from 'react-native'
import React from 'react'
import BackButton from './appHeader/BackButton';
import { IMAGES } from '../utils/constants';
import { COLORS } from '../utils/constants';
import { AppModalProps } from '../utils/types';

const AppModal = (props: AppModalProps) => {

    return (
        <Modal
            transparent={true}
            animationType='fade'
            visible={props?.visible}
            onRequestClose={props?.onDismiss}>
            <View style={styles.overlayStyle}>
                <TouchableWithoutFeedback>
                    <View style={[styles.containerStyle, props?.containerStyle]}>
                        {props?.showCloseIcon ? <BackButton onBack={props?.onClose} style={{ position: 'absolute', right: 10, top: 10, borderColor: COLORS.transparent }} backImgSrc={IMAGES.close} /> : null}
                        {props.children}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    )
}

export default AppModal

const styles = StyleSheet.create({
    overlayStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.black_rgba(0.8),
    },
    containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        backgroundColor: COLORS.white_color,
        borderRadius: 15,
        padding: 10
    },
})


/**
 * Usage
 *  <AppModal
        visible={handle visibility by passing true/false}
        onDismiss={() => manage visibility}
        containerStyle={{ height: '30%' }}
    >
        {pass children here}
    </AppModal>
 */