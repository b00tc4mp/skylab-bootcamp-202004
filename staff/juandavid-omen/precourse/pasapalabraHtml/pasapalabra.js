let multiplesQuestions = [
    [
        { letter: "a", answer: "ADN", status: 0, question: "Con la A.\nMolécula portadora de la información genética." },
        { letter: "a", answer: "abducir", status: 0, question: "Con la A.\nDicho de una supuesta criatura extraterrestre: Apoderarse de alguien" },
        { letter: "a", answer: "aparecer", status: 0, question: "Con la A.\nManifestarse, dejarse ver, por lo común, causando sorpresa, admiración u otro movimiento del ánimo" },
        { letter: "a", answer: "anglosajon", status: 0, question: "Con la A.\nDicho de una persona: De procedencia y lengua inglesas" },
        { letter: "a", answer: "aroma", status: 0, question: "Con la A.\nPerfume, olor muy agradable" },
        { letter: "a", answer: "acera", status: 0, question: "Con la A.\nOrilla de la calle o de otra vía pública" },
    ],
    [       
        { letter: "b", answer: "barómetro", status: 0, question: "Con la B.\nAparato para medir la presión atmosférica." },
        { letter: "b", answer: "bingo", status: 0, question: "Con la B.\nJuego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso" },
        { letter: "b", answer: "bar", status: 0, question: "Con la B.\nLugar donde pasan horas los universitarios" },
        { letter: "b", answer: "baraja", status: 0, question: "Con la B.\nConjunto completo de cartas empleado para juegos de azar" },
        { letter: "b", answer: "beato", status: 0, question: "Con la B.\nDicho de una persona: Beatificada por el papa" },
        { letter: "b", answer: "buhardilla", status: 0, question: "Con la B.\nParte de un edificio situada inmediatamente debajo del tejado, con techo en pendiente y destinada a vivienda" },
    ],
    [
        { letter: "c", answer: "caries", status: 0, question: "Con la C.\nDestrucción del diente por falta de higiene." },
        { letter: 'c', answer: "churumbel", status: 0, question: "Con la C.\nNiño, crío, bebé" },
        { letter: 'c', answer: "cartabon", status: 0, question: "Con la C.\nPlantilla de madera, plástico u otro material, en forma de triángulo rectángulo escaleno, que se utiliza en dibujo" },
        { letter: 'c', answer: "ceja", status: 0, question: "Con la C.\nParte de la cara, prominente, curvilínea y cubierta de pelo, situada sobre la cuenca del ojo" },
        { letter: 'c', answer: "cian", status: 0, question: "Con la C.\nDicho de un color: Azul verdoso, complementario del rojo" },
        { letter: 'c', answer: "corona", status: 0, question: "Con la C.\nAro, hecho de flores, de ramas o de metal, que ciñe la cabeza y se usa como adorno, insignia honorífica o símbolo de dignidad o realeza" },
    ],
    [
        { letter: "d", answer: "densidad", status: 0, question: "Con la D.\nMasa dividida por volumen." },
        { letter: "d", answer: "diarrea", status: 0, question: "Con la D.\nAnormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida" },
        { letter: "d", answer: "dragon", status: 0, question: "Con la D.\nCriatura fantástica sobre la que volaba Daenerys Targaryen" },
        { letter: "d", answer: "dibujo", status: 0, question: "Con la D.\n Delineación o imagen dibujada" },
        { letter: "d", answer: "dedal", status: 0, question: "Con la D.\nUtensilio pequeño, ligeramente cónico y hueco, con la superficie llena de hoyuelos y cerrado a veces por un casquete esférico para proteger el dedo al coser" },
        { letter: "d", answer: "duda", status: 0, question: "Con la D.\nSuspensión o indeterminación del ánimo entre dos juicios o dos decisiones, o bien acerca de un hecho o una noticia" },
    ],
    [
        { letter: "e", answer: "enfermedad", status: 0, question: "Con la E.\nFalta de salud." },
        { letter: "e", answer: "ectoplasma", status: 0, question: "Con la E.\nGelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación" },
        { letter: "e", answer: "estornudar", status: 0, question: "Con la E.\nDespedir o arrojar con violencia el aire de los pulmones, por la espiración involuntaria y repentina promovida por un estímulo que actúa sobre la membrana pituitaria" },
        { letter: "e", answer: "entrada", status: 0, question: "Con la E.\nEspacio por donde se entra a alguna parte" },
        { letter: "e", answer: "emanacion", status: 0, question: "Con la E.\nAcción y efecto de emanar" },
        { letter: "e", answer: "embalsamador", status: 0, question: "Con la E.\nadj. Que embalsama" },
    ],
    [
        { letter: "f", answer: "fumar", status: 0, question: "Con la F.\nHábito perjudicial para el aparato respiratorio." },
        { letter: "f", answer: "facil", status: 0, question: "Con la F.\nQue no requiere gran esfuerzo, capacidad o dificultad" },
        { letter: "f", answer: "fosil", status: 0, question: "Con la F.\nDicho de una sustancia de origen orgánico o de un resto de organismo: Que está más o menos petrificado" },
        { letter: "f", answer: "fiebre", status: 0, question: "Con la F.\nFenómeno patológico que se manifiesta por elevación de la temperatura normal del cuerpo y mayor frecuencia del pulso y la respiración" },
        { letter: "f", answer: "faba", status: 0, question: "Con la F.\nFruto y semilla de la judía" },
        { letter: "f", answer: "fobia", status: 0, question: "Con la F.\nAversión exagerada a alguien o a algo" },
    ],
    [
        { letter: "g", answer: "genoma", status: 0, question: "Con la G.\nInformación genética de un ser vivo." },
        { letter: "g", answer: "galaxia", status: 0, question: "Con la G.\nConjunto enorme de estrellas, polvo interestelar, gases y partículas" },
        { letter: "g", answer: "gota", status: 0, question: "Con la G.\nPequeña porción de un líquido, con forma esferoidal" },
        { letter: "g", answer: "gato", status: 0, question: "Con la G.\nMamífero carnívoro de la familia de los félidos, digitígrado, doméstico, de unos 50 cm de largo desde la cabeza hasta el arranque de la cola" },
        { letter: "g", answer: "gobernador", status: 0, question: "Con la G.\nQue gobierna" },
        { letter: "g", answer: "genoma", status: 0, question: "Con la G.\nSecuencia de nucleótidos que constituye el ADN de un individuo o de una especie" },
    ],
    [
        { letter: "h", answer: "hidrógeno", status: 0, question: "Con la H.\nElemento químico de número atómico 1." },
        { letter: "h", answer: "harakiri", status: 0, question: "Con la H.\nSuicidio ritual japonés por desentrañamiento" },
        { letter: "h", answer: "hoguera", status: 0, question: "Con la H.\nFuego hecho al aire libre con materias combustibles que levantan mucha llama" },
        { letter: "h", answer: "higo", status: 0, question: "Con la H.\nSegundo fruto, o el más tardío, de la higuera, blando, de gusto dulce" },
        { letter: "h", answer: "hobbit", status: 0, question: "Con la H.\nHabitantes de la Comarca, raza del protagonista de la famosa trilogía de J.R.R. Tolkien" },
        { letter: "h", answer: "habitacion", status: 0, question: "Con la H.\nEn una vivienda, cada uno de los espacios entre tabiques destinados a dormir, comer, etc" },
    ],
    [
        { letter: "i", answer: "insectos", status: 0, question: "Con la I.\nLa mosca, la hormiga, la avispa y la abeja son..." },
        { letter: "i", answer: "iglesia", status: 0, question: "Con la I.\nTemplo cristiano" },
        { letter: "i", answer: "Internet", status: 0, question: "Con la I.\nRed informática mundial, descentralizada" },
        { letter: "i", answer: "invadir", status: 0, question: "Con la I.\nIrrumpir, entrar por la fuerza" },
        { letter: "i", answer: "intencion", status: 0, question: "Con la I.\nDeterminación de la voluntad en orden a un fin" },
        { letter: "i", answer: "impulsar", status: 0, question: "Con la I.\nDar empuje para producir movimiento" },
    ],
    [
        { letter: "j", answer: "jueves", status: 0, question: "Con la J.\nDía de la semana." },
        { letter: "j", answer: "jabali", status: 0, question: "Con la J.\nVariedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba" },
        { letter: "j", answer: "jauria", status: 0, question: "Con la J.\nConjunto de perros mandados por el mismo perrero que levantan la caza en una montería" },
        { letter: "j", answer: "jamon", status: 0, question: "Con la J.\nPierna trasera del cerdo, curada o cocida entera" },
        { letter: "j", answer: "juramento", status: 0, question: "Con la J.\nAfirmación o negación de algo, poniendo por testigo a Dios, o en sí mismo o en sus criaturas" },
        { letter: "j", answer: "jabalina", status: 0, question: "Con la J.\nArma, a manera de pica o venablo, que se usaba más comúnmente en la caza mayor, y actualmente en una modalidad deportiva" },
    ],
    [
        { letter: "k", answer: "kilogramo", status: 0, question: "Con la K.\nUnidad de medida de masa." },
        { letter: "k", answer: "kamikaze", status: 0, question: "Con la K.\nPersona que se juega la vida realizando una acción temeraria" },
        { letter: "k", answer: "kebab", status: 0, question: "Con la K.\nMasa de carne picada que, ensartada en una varilla, se asa haciéndose girar ante una fuente de calor" },
        { letter: "k", answer: "koala", status: 0, question: "Con la K.\nMamífero marsupial arborícola parecido a un oso pequeño, propio de los eucaliptales australianos" },
        { letter: "k", answer: "kosobar", status: 0, question: "Con la K.\nNatural de Kosovo, provincia autónoma de Serbia" },
        { letter: "k", answer: "kilobyte", status: 0, question: "Con la K.\nUnidad equivalente a 1024 (210) bytes" },

    ],
    [
        { letter: "l", answer: "leucemia", status: 0, question: "Con la L.\nCáncer de la sangre." },
        { letter: "l", answer: "licantropo", status: 0, question: "Con la L.\nHombre lobo" },
        { letter: "l", answer: "lengua", status: 0, question: "Con la L.\nÓrgano muscular situado en la cavidad de la boca de los vertebrados y que sirve para gustar y deglutir" },
        { letter: "l", answer: "lealtad", status: 0, question: "Con la L.\nCumplimiento de lo que exigen las leyes de la fidelidad y las del honor y hombría de bien" },
        { letter: "l", answer: "loro", status: 0, question: "Con la L.\nPapagayo, ave, y más particularmente el que tiene el plumaje con fondo rojo" },
        { letter: "l", answer: "liar", status: 0, question: "Con la L.\nFormar un cigarrillo envolviendo la picadura en el papel de fumar" },
    ],
    [
        { letter: "m", answer: "marmol", status: 0, question: "Con la M.\nRoca que se utiliza en la construcción." },
        { letter: "m", answer: "misantropo", status: 0, question: "Con la M.\nPersona que huye del trato con otras personas o siente gran aversión hacia ellas" },
        { letter: "m", answer: "meteorito", status: 0, question: "Con la M.\nFragmento de un cuerpo celeste que cae sobre la Tierra, o sobre un astro cualquiera" },
        { letter: "m", answer: "musculo", status: 0, question: "Con la M.\nÓrgano compuesto principalmente de fibras contráctiles" },
        { letter: "m", answer: "monte", status: 0, question: "Con la M.\nGran elevación natural del terreno" },
        { letter: "m", answer: "mundana", status: 0, question: "Con la M.\nDicho de una persona: Inclinada a los placeres y frivolidades de la vida social" },
    ],
    [
        { letter: "n", answer: "neutron", status: 0, question: "Con la N.\nPartícula subatómica sin carga eléctrica." },
        { letter: "n", answer: "necedad", status: 0, question: "Con la N.\nDemostración de poca inteligencia" },
        { letter: "n", answer: "nariz", status: 0, question: "Con la N.\nÓrgano prominente del rostro humano, entre la frente y la boca, con dos orificios" },
        { letter: "n", answer: "neandertal", status: 0, question: "Con la N.\nDicho de un individuo: De un grupo extinto de homínidos que vivió en gran parte de Europa y parte de Asia durante el Paleolítico medio" },
        { letter: "n", answer: "necio", status: 0, question: "Con la N.\nIgnorante y que no sabe lo que podía o debía saber" },
        { letter: "n", answer: "no", status: 0, question: "Con la N.\nExpresa negación" },
    ],
    [
        { letter: "ñ", answer: "año", status: 0, question: "Contiene la Ñ.\nUnidad de tiempo." },
        { letter: "ñ", answer: "señal", status: 0, question: "Contiene la Ñ.\nIndicio que permite deducir algo de lo que no se tiene un conocimiento directo." },
        { letter: "ñ", answer: "diseñar", status: 0, question: "Contiene la Ñ.\nhacer un diseño" },
        { letter: "ñ", answer: "antaño", status: 0, question: "Contiene la Ñ.\nEn un tiempo pasado" },
        { letter: "ñ", answer: "añorar", status: 0, question: "Contiene la Ñ.\nRecordar con pena la ausencia, privación o pérdida de alguien o algo muy querido" },
        { letter: "ñ", answer: "ñu", status: 0, question: "Con la Ñ.\nMamífero rumiante africano de la familia de los antílopes, de color pardo grisáceo, cuya cabeza recuerda la de un toro" },
    ],
    [
        { letter: "o", answer: "oro", status: 0, question: "Con la O.\nElemento químico cuyo símbolo es Au." },
        { letter: "o", answer: "orco", status: 0, question: "Con la O.\nHumanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien" },
        { letter: "o", answer: "orquesta", status: 0, question: "Con la O.\nConjunto de músicos que interpretan obras musicales con diversos instrumentos y bajo la guía de un director" },
        { letter: "o", answer: "orar", status: 0, question: "Con la O.\nHablar en público para persuadir y convencer a los oyentes o mover su ánimo" },
        { letter: "o", answer: "once", status: 0, question: "Con la O.\nDiez más uno" },
        { letter: "o", answer: "oso", status: 0, question: "Con la O.\nMamífero carnívoro plantígrado, de gran tamaño, de pelaje pardo, largo y espeso, cabeza grande, ojos pequeños, extremidades fuertes y gruesas, con garras, y cola muy corta, que vive en los montes boscosos" },
    ],
    [
        { letter: "p", answer: "Pb", status: 0, question: "Con la P.\nSímbolo químico del plomo." },
        { letter: "p", answer: "protoss", status: 0, question: "Con la P.\nRaza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft" },
        { letter: "p", answer: "piña", status: 0, question: "Con la P.\nEdificio en el que reside Bob Esponja" },
        { letter: "p", answer: "presa", status: 0, question: "Con la P.\nMuro grueso de piedra u otro material que se construye a través de un río, arroyo o canal, para almacenar el agua a fin de derivarla o regular su curso fuera del cauce" },
        { letter: "p", answer: "peaje", status: 0, question: "Con la P.\nDerecho de tránsito" },
        { letter: "p", answer: "poliglota", status: 0, question: "Con la P.\nDicho de una persona: Que habla varias lenguas" },
    ],
    [
        { letter: "q", answer: "química", status: 0, question: "Con la Q.\nCiencia que estudia las transformaciones de la materia." },
        { letter: "q", answer: "queso", status: 0, question: "Con la Q.\nProducto obtenido por la maduración de la cuajada de la leche" },
        { letter: "q", answer: "quad", status: 0, question: "Con la Q.\nVehículo todoterreno de cuatro ruedas similar a una motocicleta" },
        { letter: "q", answer: "quiste", status: 0, question: "Con la Q.\nVejiga membranosa que se desarrolla anormalmente en diferentes regiones del cuerpo y que contiene líquido o materias alteradas" },
        { letter: "q", answer: "empaquetar", status: 0, question: "Contiene la Q.\nHacer paquetes" },
        { letter: "q", answer: "adquirir", status: 0, question: "Contiene la Q.\nGanar, conseguir con el propio trabajo o industria" },
    ],
    [
        { letter: "r", answer: "ribosomas", status: 0, question: "Con la R.\nOrgánulo citoplasmático donde se fabrican proteínas." },
        { letter: "r", answer: "raton", status: 0, question: "Con la R.\nRoedor" },
        { letter: "r", answer: "remo", status: 0, question: "Con la R.\nInstrumento en forma de pala larga y estrecha, que sirve para mover las embarcaciones haciendo palanca en el agua" },
        { letter: "r", answer: "robert", status: 0, question: "Con la R.\nCabeza de la casa Baratheon y Rey de los Siete Reinos hasta su muerte" },
        { letter: "r", answer: "robar", status: 0, question: "Con la R.\nQuitar o tomar para sí con violencia o con fuerza lo ajeno" },
        { letter: "r", answer: "resina", status: 0, question: "Con la R.\nSustancia sólida o de consistencia pastosa, insoluble en el agua, soluble en el alcohol y en los aceites esenciales, y capaz de arder en contacto con el aire, obtenida naturalmente como producto que fluye de varias plantas" },
    ],
    [
        { letter: "s", answer: "sólido", status: 0, question: "Con la S.\nEstado de agregación en el que se encuentra la sal." },
        { letter: "s", answer: "stackoverflow", status: 0, question: "Con la S.\nComunidad salvadora de todo desarrollador informático" },
        { letter: "s", answer: "serpiente", status: 0, question: "Con la S.\nAnimal identificativo de la Casa Slytherin" },
        { letter: "s", answer: "sopa", status: 0, question: "Con la S.\nPlato compuesto de un caldo y uno o más ingredientes sólidos cocidos en él" },
        { letter: "s", answer: "soplar", status: 0, question: "Con la S.\nDespedir aire con violencia por la boca, alargando los labios un poco abiertos por su parte media" },
        { letter: "s", answer: "sentimiento", status: 0, question: "Con la S.\nHecho o efecto de sentir o sentirse" },
    ],
    [
        { letter: "t", answer: "temperatura", status: 0, question: "Con la T.\nEnergía interna de los cuerpos." },
        { letter: "t", answer: "terminator", status: 0, question: "Con la T.\nPelícula del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984" },
        { letter: "t", answer: "tormenta", status: 0, question: "Con la T.\nPerturbación atmosférica violenta acompañada de aparato eléctrico y viento fuerte, lluvia, nieve o granizo" },
        { letter: "t", answer: "tirano", status: 0, question: "Con la T.\nDicho de una persona: Que obtiene contra derecho el gobierno de un Estado, especialmente si lo rige sin justicia y a medida de su voluntad" },
        { letter: "t", answer: "tension", status: 0, question: "Con la T.\nEstado de un cuerpo sometido a la acción de fuerzas opuestas que lo atraen" },
        { letter: "t", answer: "tubo", status: 0, question: "Con la T.\nPieza hueca, de forma por lo común cilíndrica y generalmente abierta por ambos extremos" },
    ],
    [
        { letter: "u", answer: "unión", status: 0, question: "Con la U.\nEnlace químico de los átomos para formar compuestos." },
        { letter: "u", answer: "unamuno", status: 0, question: "Con la U.\nEscritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914" },
        { letter: "u", answer: "untar", status: 0, question: "Con la U.\nAplicar y extender superficialmente aceite u otra materia pingüe sobre algo" },
        { letter: "u", answer: "uralita", status: 0, question: "Con la U.\nMaterial de construcción hecho a base de cemento y de fibras, generalmente de asbesto, usado sobre todo en cubiertas y tejados" },
        { letter: "u", answer: "urticaria", status: 0, question: "Con la U.\nEnfermedad eruptiva de la piel, cuyo síntoma más notable es una comezón parecida a la que producen las picaduras de la ortiga" },
        { letter: "u", answer: "unir", status: 0, question: "Con la U.\nHacer que una cosa esté al lado de otra, o en contacto con ella formando un todo" },
    ],
    [
        { letter: "v", answer: "volumen", status: 0, question: "Con la V.\nEspacio que ocupa un cuerpo." },
        { letter: "v", answer: "vikingos", status: 0, question: "Con la V.\nNombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa" },
        { letter: "v", answer: "vertical", status: 0, question: "Con la V.\nDicho de una recta o de un plano: Que es perpendicular a un plano horizontal" },
        { letter: "v", answer: "vertebrado", status: 0, question: "Con la V.\nQue tiene vértebras" },
        { letter: "v", answer: "vocal", status: 0, question: "Con la V.\nPerteneciente o relativo a la voz" },
        { letter: "v", answer: "vertedero", status: 0, question: "Con la V.\nLugar adonde o por donde se vierte algo" },
    ],
    [
        { letter: "w", answer: "Washington", status: 0, question: "Con la W.\nCapital de Estados Unidos " },
        { letter: "w", answer: "sandwich", status: 0, question: "Contiene a W.\nEmparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
        { letter: "w", answer: "walkman", status: 0, question: "Con la W.\nReproductor portátil de casetes provisto de auriculares" },
        { letter: "w", answer: "wolframio", status: 0, question: "Con la W.\nambién conocido como tungsteno,​ es un elemento químico de número atómico 74 que se encuentra en el grupo 6 de la tabla periódica de los elementos. Su símbolo es W." },
        { letter: "w", answer: "wasabi", status: 0, question: "Con la W.\n Pasta de color verde y picante que se sirve para acompañar delicias como el sushi o el sashimi" },
        { letter: "w", answer: "weber", status: 0, question: "Con la W.\nUnidad de flujo magnético del sistema internacional, equivalente al flujo magnético que, al atravesar un circuito de una sola espira, símboo wb" },
    ],
    [
        { letter: "x", answer: "toxina", status: 0, question: "Contiene la X.\nLo utilizan los microbios para infectar las células." },
        { letter: "x", answer: "botox", status: 0, question: "Contiene la X.\nToxina bacteriana utilizada en cirujía estética" },
        { letter: "x", answer: "xenofoba", status: 0, question: "Con la X.\nDicho de una persona: Que siente o manifiesta xenofobia" },
        { letter: "x", answer: "mexico", status: 0, question: "Contiene la X.\nPaís de América ubicado en la parte meridional de América del Norte" },
        { letter: "x", answer: "xenon", status: 0, question: "Con la X.\nElemento químico o cuerpo simple, gaseoso, incoloro e inodoro, encontrado en el aire" },
        { letter: "x", answer: "xilofono", status: 0, question: "Con la X.\nInstrumento músico compuesto de láminas de madera, sostenidas por hilos de seda o cuerda de tripa, de espesor y longitud tales que, golpeados con un martillo dan notas diferentes" },
    ],
    [
        { letter: "y", answer: "Y", status: 0, question: "Con la Y.\nCromosoma masculino." },
        { letter: "y", answer: "peyote", status: 0, question: "Contiene  la Y.\nPequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
        { letter: "y", answer: "yate", status: 0, question: "Con la Y.\nEmbarcación de gala o de recreo"},
        { letter: "y", answer: "ayahuasca", status: 0, question: "Con la Y.\nLiana de la selva de cuyas hojas se prepara un brebaje de efectos alucinógenos, empleado por chamanes con fines curativos"},
        { letter: "y", answer: "yihad", status: 0, question: "Con la Y.\nGuerra santa de los musulmanes"},
        { letter: "y", answer: "yacare", status: 0, question: "Con la Y.\nCaimán"},
    ],
    [
        { letter: "z", answer: "zoólogo", status: 0, question: "Con la Z.\nBiólogo especialista en animales." },
        { letter: "z", answer: "zen", status: 0, question: "Con la Z.\nEscuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
        { letter: "z", answer: "zoo", status: 0, question: "Con la Z.\nParque zoológico"},
        { letter: "z", answer: "zapato", status: 0, question: "Con la Z.\nCalzado que no pasa del tobillo, con la parte inferior de suela y lo demás de piel"},
        { letter: "z", answer: "zorro", status: 0, question: "Con la Z.\nMamífero cánido de menos de un metro de longitud, incluida la cola, de hocico alargado y orejas empinadas, pelaje de color pardo rojizo y muy espeso"},
        { letter: "z", answer: "zocatearse", status: 0, question: "Con la Z.\nDicho de un fruto: Ponerse zocato"},
    ] 
];

let answerPosition = 0;
let wordPosition = 0;
let points = 0;
let play = document.getElementById('play');
let send = document.getElementById('send');
let pasapalabra = document.getElementById('pasapalabra');

play.addEventListener('click', playGame);
pasapalabra.addEventListener('click', skipWord);
send.addEventListener('click', sendAnswer);

 function resetGame() {
    for (let i = 0; i < multiplesQuestions.length; i++) {
        multiplesQuestions[i][answerPosition].status = 0;
    }
}

function setWordColor(color) {
    let circle = document.getElementsByClassName('circle-container')[0];
    let letterContainer = circle.children[wordPosition];
    let letter = letterContainer.children[0];
    letter.style.setProperty('background-color', color);
}

function setHighlitedLetter(position) {
    let circle = document.getElementsByClassName('circle-container')[0];
    let letterContainer = circle.children[position];
    let letter = letterContainer.children[0];
    letter.style.setProperty('border', 'blue 4px solid');
}

function removetHighlitedLetter(position) {
    let circle = document.getElementsByClassName('circle-container')[0];
    let letterContainer = circle.children[position];
    let letter = letterContainer.children[0];
    letter.style.setProperty('border', 'none');
}

function incrementPoints() {
    ++points;
    document.getElementById('score').innerHTML = points;
}

 function validateAnswer(userAnswer, word) {
    if (userAnswer.localeCompare(word.answer, 'es', { sensitivity: 'base' }) === 0) {
        word.status = 1;
        setWordColor('green');
        incrementPoints();
    }
    else {
        word.status = -1;
        setWordColor('red');
    }
}

function checkQuestionsCompleted() {
    for (let i = 0; i < multiplesQuestions.length; i++) {  
            if (multiplesQuestions[i][answerPosition].status === 0) {
                return false;
            } 
    }
    return true;
}

function incrementPosition() {
    let lastWordPosition = wordPosition;
    let word;
    do {
        wordPosition++;
        if(multiplesQuestions.length === wordPosition) {
            wordPosition = 0;
        }
        word = multiplesQuestions[wordPosition][answerPosition];
    } while (word.status != 0);

    removetHighlitedLetter(lastWordPosition);
    setHighlitedLetter(wordPosition);

 }

function showWord(word) {
    let answerWord = document.getElementById('letter-definition');
    answerWord.innerHTML = word.question;
}

function skipWord() { 
    incrementPosition();
    let word = multiplesQuestions[wordPosition][answerPosition];
    showWord(word);
 }


function sendAnswer() {
    let answerInput = document.getElementById('answer');
    let word = multiplesQuestions[wordPosition][answerPosition];
    validateAnswer(answerInput.value, word);
    answerInput.value = '';

    if (checkQuestionsCompleted()) {
        let correctWords = points;
        alert(`Felicidades, has completado el pasapalabras!\nHas acertado ${correctWords} letras.`);
    } else {
        skipWord();
    }

 }

function showMainControls() {
    document.getElementById('main-controls').style.display = "block";
    document.getElementById('instructions').style.display = "none";

}

function playGame() {
    showMainControls();
    answerPosition = Math.floor(Math.random()* 6);
    setHighlitedLetter(wordPosition);
    let word = multiplesQuestions[wordPosition][answerPosition];
    showWord(word);
    updateClock();
}


let totalTime = 150;
function updateClock() {
    document.getElementById('time').innerHTML = totalTime;
    if(totalTime==0){
        console.log('Final');
    } else{
        totalTime-=1;
        setTimeout("updateClock()",1000);
    }
};