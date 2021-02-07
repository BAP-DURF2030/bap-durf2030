import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import styles from './ProjectHeader.module.scss';
import { Container } from '../../Layout';
import { ProjectLikes, ProjectHelpers, ProjectHelp, ProjectCircle } from '../../Project';

const ProjectHeader = observer(({ project }) => {
  const [servicesCount, setServicesCount] = useState(0);
  const [materialsCount, setMaterialsCount] = useState(0);
  const [fundingCount, setFundingCount] = useState(0);
  const [image, setImage] = useState('../thumbnail-temp.jpg');

  console.log(project);

  let tags = [];
  Object.keys(project.themes).forEach((key) => {
    if (project.themes[key] === true) {
      tags.push(key);
    }
  });

  Object.keys(project.categories).forEach((key) => {
    if (project.categories[key] === true) {
      tags.push(key);
    }
  });

  useEffect(() => {
    if (project.image.enabled && project.image.url) {
      setImage(project.image.url);
    }
  }, []);

  useEffect(() => {
    let materialsCountNew = 0;
    let servicesCountNew = 0;
    let fundingCountNew = 0;

    project.materials.forEach((item) => {
      if (item.completed === true) {
        materialsCountNew++;
      }
    });

    project.services.forEach((item) => {
      if (item.completed === true) {
        servicesCountNew++;
      }
    });

    project.durvers.forEach((item) => {
      if (item.fundingOffered === true) {
        const number = parseInt(item.fundingAmount);
        fundingCountNew = fundingCountNew + number * 2;
      }
    });

    setMaterialsCount(materialsCountNew);
    setServicesCount(servicesCountNew);
    setFundingCount(fundingCountNew);
  }, [project.materials, project.services, project.durvers]);

  return (
    <Container>
      <img className={styles.images} src={image} />
      {/* <div className={styles.images}>Images</div> */}
      <div className={styles.content}>
        <ul className={styles.tags}>
          {tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
        <div className={styles.text}>
          <h1 className={styles.title}>{project.title}</h1>
          {project.isKnownPlace && (
            <div className={styles.location}>
              <img src="/icons/location-green.svg" alt="logo DURF2030" width="13.75" height="15.9" />
              <p>
                {project.street} {project.number}, {project.city}
              </p>
            </div>
          )}
          <p className={styles.intro}>{project.intro}</p>
        </div>
        <div className={styles.help}>
          {project.servicesRequired && (
            <div className={styles.item}>
              <ProjectCircle type="service" progress={(servicesCount / project.services.length) * 100} />
              <p className={styles.info}>
                {servicesCount}/{project.services.length} diensten
              </p>
              <p className={styles.item__btn}>Bekijk info</p>
            </div>
          )}
          {project.materialsRequired && (
            <div className={styles.item}>
              <ProjectCircle type="material" progress={(materialsCount / project.materials.length) * 100} />
              <p className={styles.info}>
                {materialsCount}/{project.materials.length} materialen
              </p>
              <p className={styles.item__btn}>Bekijk info</p>
            </div>
          )}
          {project.fundingRequired && (
            <div className={styles.item}>
              <ProjectCircle type="funding" progress={(fundingCount / project.fundingAmount) * 100} />
              <p className={styles.info}>
                {fundingCount}/{project.fundingAmount} geld
              </p>
              <p className={styles.item__btn}>Bekijk info</p>
            </div>
          )}
        </div>
        <div className={styles.buttons}>
          <ProjectHelp project={project} />
          <div className={styles.interact}>
            <ProjectLikes project={project} />
            {project.durvers.length != 0 && <ProjectHelpers project={project} />}
          </div>
        </div>
      </div>
    </Container>
  );
});

export default ProjectHeader;
