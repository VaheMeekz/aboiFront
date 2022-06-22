import React, { useState } from "react";
import { HelmetLayout } from "../../src/layouts";
import { useRouter } from "next/router";
import { careerData } from "../../src/utils/careerData";
import Arrow from "../../src/svg/prevArrow.svg";
import css from "./careerId.module.css";
import { Container, Button, Modal, Form } from "react-bootstrap";

const CareerDetail = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const careerId = router.query.id;

  const fillter = careerData.filter((i) => {
    return careerId == i.id;
  });

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/career");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getFile = (e) => {
    setFile(e.target.files[0]);
  };



  return (
    <>
      <div>
        <HelmetLayout title="details">
          <div className={"mt-3"}>
            <div className={css.careerIdBg}>
              <Container>
                <div onClick={handleClick} className={css.arrow}>
                  <Arrow />
                  <p className={css.back_home}>Վերադառնալ</p>
                </div>
                <div className={css.divSec}>
                  {fillter
                    ? fillter.map((i) => {
                        return <h2 key={i.id}>{i.categoryWork}</h2>;
                      })
                    : null}
                </div>
              </Container>
            </div>

            <Container>
              <div>
                <div className={css.dataText}>
                  <h5>Աշխատանքի նկարագրություն.</h5>
                  <p>
                    Lorem Ipsum-ը տպագրության և տպագրական արդյունաբերության
                    համար նախատեսված մոդելային տեքստ է: Սկսած 1500-ականներից`
                    Lorem Ipsum-ը հանդիսացել է տպագրական արդյունաբերության
                    ստանդարտ մոդելային տեքստ, ինչը մի անհայտ տպագրիչի կողմից
                    տարբեր տառատեսակների օրինակների գիրք ստեղծելու ջանքերի
                    արդյունք է: Այս տեքստը ոչ միայն կարողացել է գոյատևել հինգ
                    դարաշրջան, այլև ներառվել է էլեկտրոնային տպագրության մեջ`
                    մնալով էապես անփոփոխ: Այն հայտնի է դարձել 1960-ականներին
                    Lorem Ipsum բովանդակող Letraset էջերի թողարկման արդյունքում,
                    իսկ ավելի ուշ համակարգչային տպագրության այնպիսի ծրագրերի
                    թողարկման հետևանքով, ինչպիսին է Aldus PageMaker-ը, որը
                    ներառում է Lorem Ipsum-ի տարատեսակներ:
                  </p>
                </div>

                <div className={css.dataText}>
                  <h5>Պարտականությունները:</h5>
                  <p>
                    Lorem Ipsum-ը տպագրության և տպագրական արդյունաբերության
                    համար նախատեսված մոդելային տեքստ է: Սկսած 1500-ականներից`
                    Lorem Ipsum-ը հանդիսացել է տպագրական արդյունաբերության
                    ստանդարտ մոդելային տեքստ, ինչը մի անհայտ տպագրիչի կողմից
                    տարբեր տառատեսակների օրինակների գիրք ստեղծելու ջանքերի
                    արդյունք է:
                  </p>
                </div>

                <div className={css.dataText}>
                  <h5>Պահանջներ:</h5>
                  <p>
                    Lorem Ipsum-ը տպագրության և տպագրական արդյունաբերության
                    համար նախատեսված մոդելային տեքստ է: Սկսած 1500-ականներից`
                    Lorem Ipsum-ը հանդիսացել է տպագրական արդյունաբերության
                    ստանդարտ մոդելային տեքստ, ինչը մի անհայտ տպագրիչի կողմից
                    տարբեր տառատեսակների օրինակների գիրք ստեղծելու ջանքերի
                    արդյունք է:
                  </p>
                </div>

                <div className={css.dataText}>
                  <button className={css.dataBtn} onClick={handleShow}>
                    Դիմել
                  </button>
                </div>
              </div>
            </Container>
            <div className={"mb-5"}>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <div className={css.modalTitle}>
                      <h5>Դիմել հայտարարությանը</h5>
                      <h5>Վաճառողուհի</h5>
                    </div>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className={css.modalInputs}>
                    <input
                      type="text"
                      placeholder={"Անուն Ազգանուն"}
                      className={css.modalInputsMain}
                    />
                    <input
                      type="text"
                      placeholder={"Հեռախոսահամար"}
                      className={css.modalInputsMain}
                    />
                    <input
                      type="text"
                      placeholder={"Էլ․ փոստի հասցե"}
                      className={css.modalInputsMain}
                    />
                    <input
                      type="date"
                      placeholder={"Ծննդյան օր"}
                      className={css.modalInputsMainDate}
                    />
                    <div className="inputfile-box">
                      <input
                        type="file"
                        id="file"
                        className="inputfile"
                        //   onChange="uploadFile(this)"
                        onChange={getFile}
                      />
                      <label htmlFor="file" className={css.labelFile}>
                        <div className={css.borderFile}>
                          <p>Կցել ինքնակենսագրական</p>
                        </div>
                        <span id="file-name" className="file-box" />
                        <span className="file-button">
                          <p>Վերբեռնել</p>
                        </span>
                      </label>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className={css.saveBtnDiv}>
                    <button className={css.saveBtn} onClick={handleClose}>
                      Դիմել
                    </button>
                  </div>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </HelmetLayout>
      </div>
    </>
  );
};

export default CareerDetail;
