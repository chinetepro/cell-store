/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useContext, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Cpu } from 'styled-icons/remix-line/Cpu';
import { Calendar } from 'styled-icons/boxicons-solid/Calendar';
import { Microchip } from 'styled-icons/fa-solid/Microchip';
import { MobileAlt } from 'styled-icons/fa-solid/MobileAlt';
import { Mobile } from 'styled-icons/fa-solid/Mobile';
import { Code } from 'styled-icons/fa-solid/Code';
import { BatteryThreeQuarters } from 'styled-icons/fa-solid/BatteryThreeQuarters';
import { Weight } from 'styled-icons/fa-solid/Weight';
import { CameraAlt } from 'styled-icons/material/CameraAlt';
import { CartPlus } from 'styled-icons/fa-solid/CartPlus';
import validations, { isRequired } from '../../../lib/validations';
import { errorToast, successToast } from '../../../utils/toast';
import _reduce from "lodash/reduce";
import { useFormik } from 'formik';
import { CarContext, ModuleContext } from '../Contexts';
import CustomSelect from "../../../Components/Select/Select"
import _get from 'lodash/get';
import { mapReqError, mapTextError } from '../../NetworkAlert/Page/Alert';
import ImageRenderComponent from '../Components/ImageRenderComponent';

const SpecsWrapper = ({ classNameIcon = '', sizeIcon = "20px", Icon, specs, specsDescription, inColumn = false, propsStyle = {} }) => {
  return <div className={`flex mb-1 mr-2 border-gray-200 ${inColumn ? 'flex-col justify-start border-r' : 'flex-row items-center border-none'}`} style={{ ...propsStyle }}>
    <span className={`font-bold ${classNameIcon}`}><Icon size={sizeIcon} /></span>
    <span className={`text-2xl ${inColumn ? 'mb-1' : 'ml-2'} title-font text-gray-500 font-bold upetracking-widest`}>{specs}</span>
    <span className={`text-lg ${inColumn ? 'mb-1' : 'ml-2'} title-font text-gray-400 upetracking-widest`}>{specsDescription}</span>
  </div>
};

const validate = validations({
  colorCode: [isRequired],
  storageCode: [isRequired],
});

const tranformArray = (array) => _reduce(
  array,
  (result, value) => ({ ...result, [value.code]: value.name }),
  {},
);

const OfferForm = ({ t, data, loading }) => {
  const car = useContext(CarContext);
  const { useAddToCart } = useContext(ModuleContext);
  const { performRequest, isLoading } = useAddToCart();

  const handleAdd = useCallback((values) => {
    car.addItem(values);
  }, [car]);

  const handleSubmit = async (values) => {
    try {
      const input = { id: data?.id, ...values };
      await performRequest(input);
      handleAdd(input);
      successToast(t('The offers has sucessfully added'));
    } catch (e) {
      console.error(e);
      const networkError = mapReqError(e);
      const textError = mapTextError(networkError, t);
      errorToast(textError);  
    }
  };

  const updateProperty = (name, value) => formik.handleChange({
    target: {
      name,
      value
    }
  });

  
  const formik = useFormik({
    initialValues: { 
      colorCode: _get(data, 'options.colors[0].code'),
      storageCode: _get(data, 'options.storages[0].code') 
    },
    validate, // validations associate
    onSubmit: handleSubmit,
  });
  
  const colorsOptions = useMemo(() => tranformArray(data?.options?.colors), [data?.options?.colors]);

  const storagesOptions = useMemo(() => tranformArray(data?.options?.storages), [data?.options?.storages]);
  
  const disabledSave = isLoading || !formik.isValid;

  const classNameButton =
    'flex ml-auto text-white bg-blue-800 border-0 py-2 px-6 focus:outline-none hover:bg-blue-900 rounded-md '.concat(
      disabledSave ? 'cursor-not-allowed bg-gray-300' : '',
    );

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-10 mx-auto">
        <div className="lg:w-11/12 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 h-full w-full rounded-md shadow-md border border-gray-200">
            <ImageRenderComponent urlImage={data?.imgUrl} maxHeight={'24rem'}/>
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-2xl title-font text-gray-500 upetracking-widest">{data?.brand || ''}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data?.model || ''}</h1>
            <div className="flex flex-wrap">
              <SpecsWrapper Icon={Cpu} specsDescription={data?.cpu} />
              <SpecsWrapper Icon={Calendar} specsDescription={data?.announced} />
              <SpecsWrapper Icon={Code} specsDescription={data?.os} />
              <SpecsWrapper Icon={MobileAlt} specsDescription={data?.displayResolution} />
              <SpecsWrapper Icon={Mobile} specsDescription={data?.dimentions} />
              <SpecsWrapper Icon={BatteryThreeQuarters} specsDescription={data?.battery} />
            </div>
            <div className="w-full flex flex-wrap py-1">
              <SpecsWrapper Icon={Microchip} specs={data?.ram} specsDescription={data?.chipset} sizeIcon={'30px'} inColumn propsStyle={{ width: '180px' }} />
              <SpecsWrapper Icon={Weight} specs={`${data?.weight || '-'} grams`} specsDescription={data?.usb} sizeIcon={'30px'} inColumn propsStyle={{ width: '180px' }} />
              <SpecsWrapper Icon={CameraAlt} specs={data?.primaryCamera[0]} specsDescription={data?.secondaryCmera} sizeIcon={'30px'} inColumn propsStyle={{ width: '140px' }} />
            </div>
            <form onSubmit={formik.handleSubmit} initialvalues={formik?.initialValues} autoComplete="off">
              <div className="flex mt-6 items-start pb-5 border-t-2 border-gray-200 pt-4">
                <div className="flex items-start">
                  <span className="mr-3 mt-2">Color</span>
                  <CustomSelect
                    name="colorCode"
                    onChange={(v) => updateProperty("colorCode", v)}
                    value={`${formik?.values?.colorCode}`}
                    onBlur={formik.handleBlur}
                    error={formik?.errors?.colorCode && t(formik.errors.colorCode)}
                    useBoxShadow={true}
                    options={colorsOptions}
                  />
                </div>
                <div className="flex ml-6 items-start">
                  <span className="mr-3 mt-2">Storage</span>
                    <CustomSelect
                      name="storageCode"
                      onChange={(v) => updateProperty("storageCode", v)}
                      value={`${formik?.values?.storageCode}`}
                      onBlur={formik.handleBlur}
                      error={formik?.errors?.storageCode && t(formik.errors.storageCode)}
                      useBoxShadow={true}
                      options={storagesOptions}
                    />
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">{`£ ${data?.price || 0}`}</span>
                <button type="submit" disabled={disabledSave} className={classNameButton}><CartPlus size={'24px'} /></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(OfferForm);

OfferForm.propTypes = {
  data: PropTypes.any,
  lang: PropTypes.string,
  loading: PropTypes.bool,
  t: PropTypes.func
};
