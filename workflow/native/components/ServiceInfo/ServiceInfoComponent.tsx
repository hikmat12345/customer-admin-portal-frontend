import { Collapse, HStack, Spacer, Stack, Text, View, VStack } from 'native-base';
import type { FC, ReactNode } from 'react';
import React from 'react';
import { Image, Pressable } from 'react-native';

import type { WorkflowDataType } from '../../../shared';
import { Colors, Strings, SuperServiceInfo } from '../../../shared';
import { Images } from '../../assets';
import { horizontalScale, moderateScale, verticalScale } from '../../theme';
import { RenderStatusAndTextComponent, RenderTextComponent } from './Components';
import styles from './ServiceInfoComponentStyle';
import type { ServiceDetailType } from './ServiceInfoComponentType';

const ServiceDetail: FC<ServiceDetailType> = ({ showServiceDetail, serviceInfoData }: ServiceDetailType) => (
  <Collapse isOpen={showServiceDetail}>
    <View style={[styles.mainContainer, showServiceDetail && styles.showCollapseStyle]}>
      <View p={horizontalScale(14)} flexDirection={'row'} justifyContent={'space-between'}>
        <View
          width={'48%'}
          borderRadius={moderateScale(8)}
          backgroundColor={Colors.lightGray}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Image style={styles.imageStyle} source={{ uri: serviceInfoData?.image ?? '' }} />
        </View>
        <View width={'48%'}>
          <RenderTextComponent title={Strings.serviceStatus} value={serviceInfoData.live} />
          <RenderTextComponent
            title={Strings.contractEndDate}
            value={serviceInfoData?.contractEndDate ?? ''}
            isMargin={true}
          />
          <RenderStatusAndTextComponent
            title={Strings.eligibleUpgrade}
            value={serviceInfoData?.upgradeEligible ?? ''}
            isMargin={true}
          />
        </View>
      </View>
      <View px={horizontalScale(14)}>
        <RenderTextComponent title={Strings.deviceManufacturer} value={serviceInfoData?.deviceManufacturer ?? ''} />
        <RenderTextComponent title={Strings.device} value={serviceInfoData?.device ?? ''} isMargin={true} />
        <RenderTextComponent title={Strings.vendor} value={serviceInfoData?.vendor ?? ''} isMargin={true} />
        <RenderTextComponent title={Strings.tariffAndPlan} value={serviceInfoData?.tariff ?? ''} isMargin={true} />

        <HStack flexDirection={'row'} justifyContent={'space-between'}>
          <VStack width={'48%'}>
            <RenderTextComponent
              title={Strings.serialNumberAndIMEINumber}
              value={serviceInfoData?.serialORIMEINumber ?? ''}
              isMargin={true}
            />
          </VStack>
          <VStack width={'48%'}>
            <RenderTextComponent title={Strings.costCenter} value={serviceInfoData?.costCenter ?? ''} isMargin={true} />
          </VStack>
        </HStack>
      </View>
    </View>
  </Collapse>
);

class ServiceInfoComponent extends SuperServiceInfo<WorkflowDataType> {
  handleToggle = () => {
    const { showServiceDetail, serviceInfoData } = this.state;
    if (Object.keys(serviceInfoData).length > 0) {
      this.setState({ showServiceDetail: !showServiceDetail });
    }
  };
  render(): ReactNode {
    const { showServiceDetail, serviceInfoData } = this.state;
    const { title } = this.props;
    return (
      <Stack style={styles.container} w="100%" alignSelf="center">
        <Stack w="100%" py={verticalScale(10)} alignSelf="center">
          <Pressable onPress={this.handleToggle}>
            <HStack w="100%" px={horizontalScale(14)} justifyContent={'center'} alignItems={'center'}>
              <Text fontWeight={600} color={Colors.black} fontSize={moderateScale(14)}>
                {title}
              </Text>
              <Spacer />
              {showServiceDetail ? (
                <Image source={Images.downArrow} style={[styles.icon, styles.upArrow]} />
              ) : (
                <Image source={Images.downArrow} style={styles.icon} />
              )}
            </HStack>
          </Pressable>
        </Stack>
        {Object.keys(serviceInfoData).length > 0 && (
          <ServiceDetail showServiceDetail={showServiceDetail} serviceInfoData={serviceInfoData} />
        )}
      </Stack>
    );
  }
}

export default ServiceInfoComponent;
