package day3.web;

import java.io.IOException;
import javax.servlet.DispatcherType;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

@WebFilter(urlPatterns = {"/*"}, dispatcherTypes = DispatcherType.REQUEST)
public class CORSFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, 
			FilterChain chain) throws IOException, ServletException {

		HttpServletResponse httpResp = (HttpServletResponse)response;

		httpResp.setHeader("Access-Control-Allow-Origin", "*");
		httpResp.setHeader("X-ProcessBy", "CORSFilter");

		System.out.println("In CORSFilter incoming request");

		//Pass on the request
		//Every thing before chain.doFilter is the incoming request

		chain.doFilter(request, response);

		System.out.println("In CORSFilter outgoing response");

		//Everything after chain.doFilter is the outgoing response

		//You cannot write to resp
	}
	
}
