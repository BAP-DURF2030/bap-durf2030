import styles from './ProjectIcons.module.scss';

const ProjectIcons = ({ project }) => {
  return (
    <>
      {(project.fundingRequired === true ||
        project.materialsRequired === true ||
        project.servicesRequired === true) && (
        <div className={styles.icons}>
          {project.servicesRequired && <img src="/icons/service-white.svg" alt="service" />}
          {project.materialsRequired && <img src="/icons/material-white.svg" alt="materiaal" />}
          {project.fundingRequired && <img src="/icons/money-white.svg" alt="geld" />}
        </div>
      )}
    </>
  );
};

export default ProjectIcons;