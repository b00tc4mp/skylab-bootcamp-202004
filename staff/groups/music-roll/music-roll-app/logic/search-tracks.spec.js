describe("search-track", () => {
    let query, token
    const VALID_QUERIES = ['chill', 'beats', 'californication'];
    const INVALID_QUERIES = ['asdlkjflasf', 'aaaaasldkf0980', 'oaaaaa55555asdf']
    token = "BQDcMbf7MuW3qQxUD1dMNueMlZXCAYsh37nyvv8of5gdnU_Z554KIaXUR2uKdJThMJv1VMe1k5QhsKbnEK9Vr6K5PVbimyYNQ9lEhpzWHhqJRyXVvfhHue5z4zHQwmte5J-R3yDRrUjsbthH372fIdefkI-2Rz51v0v8FdpgeyN3zl-heYBfqJGv_3cz"
   
  it("should find a track with the given query", (done) => {
    query = VALID_QUERIES.random();
    searchTrack(token, query, (error, results) => {
      expect(error).to.be.undefined;
     
      expect(results).to.exist;
      expect(results).to.be.an("array");
      expect(results.length).to.be.greaterThan(0);

      results.forEach((result) => {
        expect(result).to.be.an("object");
        expect(result.name).to.exist;
        expect(result.name).to.be.a("string");
        expect(result.artistName).to.exist;
        expect(result.artistName).to.be.a("string");
        /* expect(result.preview_url).to.exist;
        expect(result.preview_url).to.be.a("string"); */
      });
      done();
    });
  });

  it("should throw an error when token its wrong", (done) => {
    token = 'invalid'
    query = VALID_QUERIES.random();
    searchTrack(token, query, (error, results) => {
       ;
      expect(results).to.be.undefined;
      expect(error).to.exist;
      expect(error).to.be.an.instanceOf(Error)
      

      done();
    });
  });

  it("should fail when token its not a string", () => {
    query = VALID_QUERIES.random();

    expect(() => {
      searchTrack(12, query, function () {});
    }).to.throw(TypeError, "12 is not a string");

    expect(() => {
      searchTrack(null, query, function () {});
    }).to.throw(TypeError, "null is not a string");

    expect(() => {
      searchTrack(
        ()=>{},
        query,
        function () {}
      );
    }).to.throw(TypeError, "()=>{} is not a string");

    expect(() => {
      searchTrack(true, query, function () {});
    }).to.throw(TypeError, "true is not a string");

    expect(() => {
      searchTrack(NaN, query, function () {});
    }).to.throw(TypeError, "NaN is not a string");

    expect(() => {
      searchTrack({}, query, function () {});
    }).to.throw(TypeError, "[object Object] is not a string");

    expect(() => {
      searchTrack(undefined, query, function () {});
    }).to.throw(Error, "undefined is not a string");
  });

  it("should fail when query its not a string", () => {
    let token = "hola";

    expect(() => {
      searchTrack(token, 12, function () {});
    }).to.throw(TypeError, "12 is not a string");

    expect(() => {
      searchTrack(token, null, function () {});
    }).to.throw(TypeError, "null is not a string");

    expect(() => {
      searchTrack(
        token,
        ()=>{},
        function () {}
      );
    }).to.throw(TypeError, "()=>{} is not a string");

    expect(() => {
      searchTrack(token, true, function () {});
    }).to.throw(TypeError, "true is not a string");

    expect(() => {
      searchTrack(token, NaN, function () {});
    }).to.throw(TypeError, "NaN is not a string");

    expect(() => {
      searchTrack(token, {}, function () {});
    }).to.throw(TypeError, "[object Object] is not a string");

    expect(() => {
      searchTrack(token, undefined, function () {});
    }).to.throw(Error, "undefined is not a string");
  });

  it("should fail when function its not a function", () => {
    let token = "hola";
    let query = "hola";

    expect(() => {
      searchTrack(token, query, 12);
    }).to.throw(TypeError, "12 is not a function");

    expect(() => {
      searchTrack(token, query, null);
    }).to.throw(TypeError, "null is not a function");

    expect(() => {
      searchTrack(token, query, "hola");
    }).to.throw(TypeError, "hola is not a function");

    expect(() => {
      searchTrack(token, query, true);
    }).to.throw(TypeError, "true is not a function");

    expect(() => {
      searchTrack(token, query, NaN);
    }).to.throw(TypeError, "NaN is not a function");

    expect(() => {
      searchTrack(token, query, {});
    }).to.throw(TypeError, "[object Object] is not a function");

    expect(() => {
      searchTrack(token, query, undefined);
    }).to.throw(Error, "undefined is not a function");
  });
});
