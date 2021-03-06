import { useState } from 'react';
import styles from './FormPartFour.module.scss';
import {
  FormFieldSwitch,
  FormFieldInput,
  FormFieldAddItem,
  FormFieldWrapper,
} from '../index';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MATERIALTYPES, SERVICETYPES } from '../../../consts';

const FormPartFour = () => {
  const [servicesRequired, setServicesRequired] = useState(false);
  const [materialsRequired, setMaterialsRequired] = useState(false);
  const [fundingRequired, setFundingRequired] = useState(false);

  return (
    <>
      <FormFieldWrapper>
        <h2 className={styles.title}>Ondersteuning</h2>
        <h3 className={styles.subtitle}>
          Naar welke soort ondersteuning ben je op zoek?
        </h3>
        <p className={styles.info}>
          DURF2030 kan helpen met het zoeken naar de juiste partners voor je
          project, we kunnen communicatief ondersteunen en je helpen zoeken naar
          middelen om je project te realiseren.
        </p>
      </FormFieldWrapper>

      <FormFieldWrapper>
        <div className={styles.requirements}>
          <div
            className={`${styles.requirement} ${
              servicesRequired && styles.requirementChecked
            }`}
            onClick={() => {
              setServicesRequired(!servicesRequired);
            }}
          >
            <div className={`${styles.circle} ${styles.service}`} />
            <span>Vrijwilligers</span>
            <FormFieldSwitch
              name="servicesRequired"
              label="servicesRequired"
              setToggleValue={setServicesRequired}
              defaultValue={servicesRequired}
            />
          </div>
          <div
            className={`${styles.requirement} ${
              materialsRequired && styles.requirementChecked
            }`}
            onClick={() => {
              setMaterialsRequired(!materialsRequired);
            }}
          >
            <div className={`${styles.circle} ${styles.material}`} />
            <span>Materialen</span>
            <FormFieldSwitch
              name="materialsRequired"
              label="materialsRequired"
              setToggleValue={setMaterialsRequired}
              defaultValue={materialsRequired}
            />
          </div>
          <div
            className={`${styles.requirement} ${
              fundingRequired && styles.requirementChecked
            }`}
            onClick={() => {
              setFundingRequired(!fundingRequired);
            }}
          >
            <div className={`${styles.circle} ${styles.money}`} />
            <span>Donaties</span>
            <FormFieldSwitch
              name="fundingRequired"
              label="fundingRequired"
              setToggleValue={setFundingRequired}
              defaultValue={fundingRequired}
            />
          </div>
        </div>
      </FormFieldWrapper>

      {/* Vrijwilligers */}
      {servicesRequired && (
        <div className={styles.formRequirement}>
          <FormFieldWrapper>
            <h2 className={styles.title}>Vrijwilligers</h2>
            <h3 className={styles.subtitle}>
              Noteer welk soort vrijwilligers je nodig hebt
            </h3>
            <FormFieldAddItem name="services" options={SERVICETYPES} />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <h3 className={styles.subtitle}>
              Waarvoor heb je deze vrijwilligers nodig?
            </h3>
            <FormFieldInput
              multiline
              name="servicesDescription"
              label="Beschrijving"
              rows={8}
              required
            />
          </FormFieldWrapper>
        </div>
      )}

      {/* Materiaal */}
      {materialsRequired && (
        <div className={styles.formRequirement}>
          <FormFieldWrapper>
            <h2 className={styles.title}>Materiaal</h2>
            <h3 className={styles.subtitle}>
              Noteer welk soort materiaal je nodig hebt
            </h3>
            <FormFieldAddItem name="materials" options={MATERIALTYPES} />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <h3 className={styles.subtitle}>
              Waarvoor wordt het materiaal gebruikt?
            </h3>
            <FormFieldInput
              multiline
              name="materialsDescription"
              label="Beschrijving"
              rows={8}
              required
            />
          </FormFieldWrapper>
        </div>
      )}

      {/* Geld */}
      {fundingRequired && (
        <div className={styles.formRequirement}>
          <FormFieldWrapper>
            <h2 className={styles.title}>Geld</h2>
            <h3 className={styles.subtitle}>Wat is het budget? </h3>
          </FormFieldWrapper>
          {/* <Slider
        // value={value}
        // value={1}
        min={1}
        step={1}
        max={3000}
        // scale={(x) => x ** 10}
        // getAriaValueText={valueLabelFormat}
        // valueLabelFormat={valueLabelFormat}
        // onChange={handleChange}
        valueLabelDisplay="on"
        // aria-labelledby="discrete-slider-always"
        // ValueLabelComponent={ValueLabelComponent}
        marks={[
          { value: 1, label: '1 EUR' },
          { value: 3000, label: '3000 EUR' },
        ]}
      /> */}

          <FormFieldWrapper>
            <FormControl variant="outlined" fullWidth>
              <FormFieldInput
                type="number"
                name="fundingAmount"
                label="Funding"
                InputProps={{
                  inputProps: { min: 1, max: 3000 },
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
                required
              />
              <FormHelperText id="outlined-weight-helper-text">
                Max 3000 euro
              </FormHelperText>
            </FormControl>
          </FormFieldWrapper>
          <FormFieldWrapper>
            <h3 className={styles.subtitle}>
              Beschrijf waar het geld voor gebruikt zal worden
            </h3>
            <FormFieldInput
              multiline
              name="fundingDescription"
              label="Beschrijving"
              rows={8}
              required
            />
          </FormFieldWrapper>
        </div>
      )}
    </>
  );
};

export default FormPartFour;
