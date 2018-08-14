package day3.web;

// GET /films - JSON

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import javax.ws.rs.core.MediaType;

@WebServlet(urlPatterns = {"/films"})
public class FilmsServlet extends HttpServlet {

	@Resource(lookup = "jdbc/sakila")
	private DataSource sakilaDS;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
			throws ServletException, IOException {

		JsonArrayBuilder arrBuilder = Json.createArrayBuilder();

		try (Connection conn = sakilaDS.getConnection()) {

			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select * from film limit 100");

			while (rs.next()) {
				JsonObjectBuilder f = Json.createObjectBuilder();
				// { filmId: 1, title: "abc" }
				f.add("filmId", rs.getInt("film_id"))
						.add("title", rs.getString("title"));
				arrBuilder.add(f);
			}
			// [ { filmId: 1, title: "abc" }, { filmId: 2, title: "xyz" }, ... ]

		} catch (Exception e) { 
			resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			log("Performing query", e);
			return;
		}

		//resp.setHeader("Access-Control-Allow-Origin", "*");

		resp.setStatus(HttpServletResponse.SC_OK);
		// application/json
		resp.setContentType(MediaType.APPLICATION_JSON);

		try (PrintWriter pw = resp.getWriter()) {
			pw.println(arrBuilder.build().toString());
		}
	}

	
	
}
