import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import './App.css'
import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [secili, setSecili] = useState(null);
  const [notlar, setNotlar] = useState(ilkVeri());
  const baslikRef = useRef(null);
  const icerikRef = useRef(null);

  useEffect(() => {
    localStorage["notlar"] = JSON.stringify(notlar);
  }, [notlar]);

  const handleBaslikClick = function (event, index) {
    event.preventDefault();
    setSecili(notlar[index]);
    baslikRef.current.value = notlar[index].baslik;
    icerikRef.current.value = notlar[index].icerik;
  };

  const handleYeniClick = function () {
    const yeniNot = { baslik: "Yeni Not", icerik: "" };
    setNotlar([...notlar, yeniNot]);
    setSecili(yeniNot);
    baslikRef.current.value = yeniNot.baslik;
    icerikRef.current.value = yeniNot.icerik;
    toast("Yeni not oluşturuldu.");
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    const yeniNotlar = [...notlar];
    secili.baslik = baslikRef.current.value;
    secili.icerik = icerikRef.current.value;
    setNotlar(yeniNotlar);
    toast("Not kaydedildi.");
  };

  const handleDeleteClick = function () {
    const mevcutIndeks = notlar.indexOf(secili);
    console.log(mevcutIndeks)
    const yeniNotlar = notlar.filter(x => x != secili);
    const yeniIndeks = mevcutIndeks < yeniNotlar.length ? mevcutIndeks : yeniNotlar.length - 1;
    const yeniSecili = yeniIndeks < 0 ? null : yeniNotlar[yeniIndeks];
    setNotlar(yeniNotlar);
    setSecili(yeniSecili);
    baslikRef.current.value = yeniSecili?.baslik ?? "";
    icerikRef.current.value = yeniSecili?.icerik ?? "";
    toast("Not silindi.")
  };

  return (
    <>
      <ToastContainer />
      <Container fluid className='h-100 d-flex flex-column'>
        <h1 className='mt-4'>Not Defterim</h1>

        <Row className='flex-fill'>
          <Col xs={5} md={4} lg={3} className='d-flex flex-column h-100'>
            <Button onClick={handleYeniClick}>Yeni</Button>

            <div className='flex-fill my-2' style={{ height: "0" }}>
              <div className='ListContainer py-2'>
                <ListGroup>
                  {
                    notlar.map((not, i) =>
                      <ListGroup.Item key={i} action href="#" onClick={(e) => handleBaslikClick(e, i)} active={not == secili}>
                        {not.baslik}
                      </ListGroup.Item>
                    )
                  }
                </ListGroup>
              </div>
            </div>
          </Col>
          <Col xs={7} md={8} lg={9} className='position-relative'>
            {!secili && <div className='Overlay'></div>}
            <Form className='h-100 d-flex flex-column' onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control ref={baslikRef} type="text" placeholder="Bir başlık giriniz.." required />
              </Form.Group>
              <Form.Group className="mb-3 flex-fill">
                <Form.Control ref={icerikRef} className='h-100' as="textarea" placeholder='Notunuz..' />
              </Form.Group>
              <div className='pb-3'>
                <Button type='submit'>Kaydet</Button>{" "}
                <Button variant='danger' onClick={handleDeleteClick}>Sil</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

function ilkVeri() {
  const json = localStorage["notlar"];

  if (!json) {
    return [
      { baslik: "Alışveriş Listesi", icerik: "Süt, ekmek, yumurta, meyve" },
      { baslik: "Toplantı Notları", icerik: "Proje planlaması, görev dağılımı" },
      { baslik: "Seyahat Planı", icerik: "Uçak bileti, otel rezervasyonu, turistik yerler" },
      { baslik: "Öğrenilecek Konular", icerik: "JavaScript, HTML, CSS, React" }
    ];
  }

  return JSON.parse(json);

}

export default App
