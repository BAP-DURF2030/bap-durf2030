import { useState, useEffect } from 'react';
import styles from './EditBasis.module.scss';
import { EditPart, EditLabel, EditField } from '../';
import {
  FormFieldRichTextEditor,
  FormFieldInput,
  FormFieldCheckbox,
  FormFieldSwitch,
  FormFieldSelect,
  FormFieldFileUpload,
} from '../../Create';
import { THEMES, CATEGORIES, CITIES } from '../../../consts';

const EditBasis = ({ project }) => {
  const [isKnownPlace, setIsKnownPlace] = useState(project.isKnownPlace);

  const handleSaveProject = (values) => {
    console.log(values);
    if (values.categories && values.themes) {
      let categoriesWithValues = {};
      let themesWithValues = {};
      CATEGORIES.forEach((category, i) => {
        const key = category.toLowerCase();
        categoriesWithValues[key] = values.categories[i];
      });
      THEMES.forEach((theme, i) => {
        const key = theme.toLowerCase();
        themesWithValues[key] = values.themes[i];
      });
      values['categories'] = categoriesWithValues;
      values['themes'] = themesWithValues;
    }

    project.updateProject(values);
  };

  const handleSaveImage = (values) => {
    values.image = {
      enabled: values.image ? true : false,
      name: values.image ? values.image.name : '',
      file: values.image ? values.image.file : '',
      url: '',
    };
    project.updateImage(values.image);
  };

  useEffect(() => {}, []);

  return (
    <>
      <EditPart title="Algemene Info" handleSaveProject={handleSaveProject}>
        <EditField>
          <EditLabel text="Title" htmlFor="title" />
          <FormFieldInput defaultValue={project.title} name="title" required />
        </EditField>
        <EditField>
          <EditLabel text="Korte samenvatting" htmlFor="intro" />
          <FormFieldInput
            defaultValue={project.intro}
            name="intro"
            multiline
            required
          />
        </EditField>
        <EditField>
          <EditLabel text="Beschrijving" htmlFor="description" />
          <FormFieldRichTextEditor
            defaultValue={project.description}
            name="description"
          />
        </EditField>
      </EditPart>

      <EditPart title="Foto" handleSaveProject={handleSaveImage}>
        <FormFieldFileUpload name="image" defaultValue={project.image.url} />
      </EditPart>

      <EditPart title="Tags" handleSaveProject={handleSaveProject}>
        <EditField>
          <EditLabel text="Thema's" htmlFor="themes[]" />
          <fieldset className={styles.themes}>
            {THEMES.map((theme, i) => {
              return (
                <FormFieldCheckbox
                  key={i}
                  name={`themes[${i}]`}
                  option={theme}
                  defaultValue={project.themes[theme.toLowerCase()]}
                />
              );
            })}
          </fieldset>
        </EditField>
        <EditField>
          <EditLabel text="Categorieën" htmlFor="categories[]" />
          <fieldset className={styles.categories}>
            {CATEGORIES.map((category, i) => {
              return (
                <FormFieldCheckbox
                  key={i}
                  name={`categories[${i}]`}
                  option={category}
                  defaultValue={project.categories[category.toLowerCase()]}
                />
              );
            })}
          </fieldset>
        </EditField>
      </EditPart>

      <EditPart title="Locatie" handleSaveProject={handleSaveProject}>
        <EditField row>
          <EditLabel
            text="Weet je in welke stad je project doorgaat?"
            htmlFor="isKnownPlace"
          />
          <div className={styles.form__switch}>
            <span className={styles.place__label}>Nee</span>
            <FormFieldSwitch
              name="isKnownPlace"
              label="isKnownPlace"
              setToggleValue={setIsKnownPlace}
              defaultValue={project.isKnownPlace}
            />
            <span className={styles.place__label}>Ja</span>
          </div>
        </EditField>

        {isKnownPlace && (
          <>
            <div className={styles.location}>
              <EditField>
                <EditLabel text="Stad" htmlFor="city" />
                <FormFieldSelect
                  name="city"
                  options={CITIES}
                  defaultValue="Kortrijk"
                />
              </EditField>
              <EditField>
                <EditLabel text="Straat" htmlFor="street" />
                <FormFieldInput defaultValue={project.street} name="street" />
              </EditField>
              <EditField>
                <EditLabel text="Nr" htmlFor="number" />
                <FormFieldInput defaultValue={project.number} name="number" />
              </EditField>
            </div>
          </>
        )}
      </EditPart>
    </>
  );
};

export default EditBasis;
