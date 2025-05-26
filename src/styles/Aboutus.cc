#nosotros {
  text-align: center;
  padding: 50px 20px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
}

#nosotros h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #222;
}

.descripcion {
  max-width: 700px;
  margin: 0 auto 40px;
  font-size: 1.1rem;
  color: #444;
  line-height: 1.6;
}

.equipo {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 30px;
}

.miembro {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  padding: 20px;
  width: 220px;
  text-align: center;
}

.miembro img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.miembro h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.redes {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.redes a {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #333;
  font-size: 1rem;
}

.redes img {
  width: 24px;
  height: 24px;
}

/* Responsive */
@media (max-width: 768px) {
  .equipo {
    flex-direction: column;
    align-items: center;
  }

  .miembro {
    width: 80%;
  }

  .redes {
    flex-direction: column;
  }
}
